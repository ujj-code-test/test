# 시스템 아키텍처
 * MongoDB (데이터베이스): 모든 작업(Job)의 상태와 정보를 저장합니다. 작업의 생성, 조회, 수정이 모두 이곳에서 이루어집니다.
 * Job_manager.py (공통 모듈): MongoDB에 연결하고 작업을 관리(생성, 조회, 업데이트)하는 핵심 로직을 담은 클래스를 제공합니다. Producer와 Worker가 이 모듈을 가져와 사용합니다.
 * Producer.py (작업 생성기): 실행할 작업을 정의하고 Job_manager를 통해 MongoDB에 등록합니다.
 * Worker.py (작업 실행기): 주기적으로 MongoDB를 확인하여 실행할 작업이 있는지 스캔합니다. 실행할 작업을 발견하면, 상태를 'running'으로 바꾸고 실제 태스크(파이썬 스크립트)를 실행합니다. 실행이 끝나면 결과를 'completed' 또는 'failed'로 업데이트하고 로그를 저장합니다. 여러 Worker.py 인스턴스를 동시에 실행하여 작업을 분산 처리할 수 있습니다.
# 1. Job_manager.py : 공통 모듈
이 파일은 MongoDB와의 모든 상호작용을 담당합니다. 작업의 상태를 나타내는 Enum과 JobManager 클래스를 포함합니다.
## Job_manager.py

~~~
import os
from enum import Enum
from datetime import datetime, timezone
from pymongo import MongoClient, ASCENDING, ReturnDocument

# 작업 상태를 상수로 관리
class Status(Enum):
    PENDING = 'pending'
    RUNNING = 'running'
    COMPLETED = 'completed'
    FAILED = 'failed'

class JobManager:
    """
    MongoDB를 사용하여 작업을 관리하는 클래스
    """
    def __init__(self, mongo_uri="mongodb://localhost:27017/", db_name="job_db", collection_name="jobs"):
        """
        JobManager를 초기화하고 MongoDB에 연결합니다.
        """
        try:
            self.client = MongoClient(mongo_uri)
            self.db = self.client[db_name]
            self.collection = self.db[collection_name]
            # 인덱스 생성 (효율적인 조회를 위해)
            self.collection.create_index([("status", ASCENDING), ("scheduled_date", ASCENDING)])
            print("MongoDB에 성공적으로 연결되었습니다.")
        except Exception as e:
            print(f"MongoDB 연결 오류: {e}")
            raise

    def create_job(self, request_name: str, python_path: str, python_args: list = None, 
                   required_memory: int = 128, scheduled_date: datetime = None) -> str:
        """
        새로운 작업을 데이터베이스에 생성합니다.

        :param request_name: 작업 요청의 이름
        :param python_path: 실행할 파이썬 스크립트의 경로
        :param python_args: 스크립트에 전달할 인자 리스트
        :param required_memory: 필요한 메모리 (MB)
        :param scheduled_date: 작업이 스캔 대상이 될 시간 (None이면 즉시)
        :return: 생성된 작업의 ID
        """
        if python_args is None:
            python_args = []
        
        now = datetime.now(timezone.utc)
        job_document = {
            "request_name": request_name,
            "status": Status.PENDING.value,
            "created_at": now,
            "updated_at": now,
            "scheduled_date": scheduled_date or now,
            "python_path": python_path,
            "python_args": python_args,
            "required_memory": required_memory,
            "logs": [f"[{now.isoformat()}] Job created by producer."],
        }
        
        result = self.collection.insert_one(job_document)
        print(f"작업 생성 완료: {result.inserted_id}")
        return str(result.inserted_id)

    def find_and_lock_job(self) -> dict | None:
        """
        실행 가능한 작업을 찾아 상태를 'running'으로 업데이트하는 원자적(atomic) 연산.
        여러 워커가 동시에 같은 작업을 가져가지 못하도록 보장합니다.

        :return: 실행할 작업 문서 또는 None
        """
        now = datetime.now(timezone.utc)
        
        # 실행 조건: 상태가 'pending'이고, 예약 시간이 현재 시간 이전인 작업
        query = {
            "status": Status.PENDING.value,
            "scheduled_date": {"$lte": now}
        }
        
        # 업데이트 내용: 상태를 'running'으로 바꾸고, 업데이트 시간과 로그 기록
        update = {
            "$set": {
                "status": Status.RUNNING.value,
                "updated_at": now
            },
            "$push": {
                "logs": f"[{now.isoformat()}] Job picked up by worker (PID: {os.getpid()})."
            }
        }

        # 가장 오래된 작업을 먼저 처리하기 위해 created_at 기준으로 오름차순 정렬
        # find_one_and_update는 원자성을 보장
        job = self.collection.find_one_and_update(
            query,
            update,
            sort=[("created_at", ASCENDING)],
            return_document=ReturnDocument.AFTER # 업데이트 후의 문서를 반환
        )
        
        return job

    def update_job_status(self, job_id, status: Status, log_message: str):
        """
        작업의 상태와 로그를 업데이트합니다.

        :param job_id: 업데이트할 작업의 ID
        :param status: 새로운 상태 (COMPLETED or FAILED)
        :param log_message: 추가할 로그 메시지
        """
        now = datetime.now(timezone.utc)
        self.collection.update_one(
            {"_id": job_id},
            {
                "$set": {
                    "status": status.value,
                    "updated_at": now
                },
                "$push": {
                    "logs": f"[{now.isoformat()}] {log_message}"
                }
            }
        )
        print(f"작업 {job_id}의 상태를 '{status.value}'로 업데이트했습니다.")
~~~

# 2. 예제 태스크 스크립트
Worker가 실행할 간단한 예제 파이썬 스크립트입니다. 이 파일을 sample_task.py로 저장하세요.
## sample_task.py

~~~
import sys
import time
import random

def main():
    print("--- Sample Task 시작 ---")
    args = sys.argv[1:]
    print(f"전달받은 인자: {args}")

    # 작업 시간을 시뮬레이션
    sleep_time = random.randint(3, 8)
    print(f"{sleep_time}초 동안 대기합니다...")
    time.sleep(sleep_time)

    # 20% 확률로 실패 시뮬레이션
    if random.random() < 0.2:
        print("오류: 작업이 무작위로 실패했습니다.", file=sys.stderr)
        sys.exit(1)

    print("--- Sample Task 성공적으로 완료 ---")
    sys.exit(0)

if __name__ == "__main__":
    main()

3. Producer.py : Task 생성
이 스크립트는 Job_manager를 사용하여 MongoDB에 새로운 작업을 추가합니다.
# Producer.py

import os
from datetime import datetime, timedelta, timezone
from Job_manager import JobManager

def main():
    """
    실행할 작업을 생성합니다.
    """
    # 현재 스크립트의 디렉토리 경로를 기준으로 sample_task.py 경로 설정
    base_dir = os.path.dirname(os.path.abspath(__file__))
    task_script_path = os.path.join(base_dir, "sample_task.py")

    if not os.path.exists(task_script_path):
        print(f"오류: '{task_script_path}'를 찾을 수 없습니다. sample_task.py 파일을 생성해주세요.")
        return
        
    job_manager = JobManager()

    # 1. 즉시 실행될 작업 생성
    job_manager.create_job(
        request_name="Immediate Analysis Task",
        python_path=task_script_path,
        python_args=["arg1", "value1", "arg2", "value2"],
        required_memory=256
    )

    # 2. 1분 후에 실행되도록 예약된 작업 생성
    scheduled_time = datetime.now(timezone.utc) + timedelta(minutes=1)
    job_manager.create_job(
        request_name="Scheduled Report Task",
        python_path=task_script_path,
        python_args=["report_type=daily"],
        required_memory=512,
        scheduled_date=scheduled_time
    )

    # 3. 실패를 유도할 수 있는 또 다른 즉시 실행 작업
    job_manager.create_job(
        request_name="Potentially Failing Task",
        python_path=task_script_path,
        python_args=["mode=test"],
        required_memory=128
    )

if __name__ == "__main__":
    main()
~~~

# 4. Worker.py : Task 실행
이 스크립트는 실행 가능한 작업을 찾아 subprocess 모듈을 사용하여 별도의 프로세스로 실행합니다. 여러 터미널에서 이 스크립트를 실행하여 분산 처리를 시뮬레이션할 수 있습니다.
## Worker.py

~~~
import sys
import time
import subprocess
from Job_manager import JobManager, Status

def execute_task(job: dict) -> tuple[bool, str]:
    """
    주어진 작업을 별도의 프로세스로 실행하고 결과를 반환합니다.

    :param job: 실행할 작업 문서
    :return: (성공 여부, 로그) 튜플
    """
    python_path = job.get("python_path")
    python_args = job.get("python_args", [])
    
    # sys.executable은 현재 워커를 실행하는 파이썬 인터프리터를 사용
    command = [sys.executable, python_path] + python_args
    
    print(f"명령어 실행: {' '.join(command)}")
    
    try:
        # check=False: 반환 코드가 0이 아니어도 예외를 발생시키지 않음
        # capture_output=True: stdout과 stderr를 캡처
        # text=True: stdout/stderr를 문자열로 디코딩
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=False,
            encoding='utf-8'
        )
        
        # 실행 로그 조합
        log_output = f"--- STDOUT ---\n{result.stdout}\n--- STDERR ---\n{result.stderr}"
        
        if result.returncode == 0:
            return True, f"작업 성공.\n{log_output}"
        else:
            return False, f"작업 실패 (Exit Code: {result.returncode}).\n{log_output}"

    except Exception as e:
        error_message = f"Worker에서 스크립트 실행 중 예외 발생: {e}"
        print(error_message)
        return False, error_message


def main():
    """
    Worker 프로세스의 메인 루프.
    """
    job_manager = JobManager()
    print("Worker 시작. 실행 가능한 작업을 기다립니다...")
    
    while True:
        job = job_manager.find_and_lock_job()
        
        if job:
            job_id = job["_id"]
            print(f"\n작업을 찾았습니다: {job_id} (요청명: {job['request_name']})")
            
            success, log_message = execute_task(job)
            
            if success:
                job_manager.update_job_status(job_id, Status.COMPLETED, log_message)
            else:
                job_manager.update_job_status(job_id, Status.FAILED, log_message)
        else:
            # 실행할 작업이 없으면 5초 대기 후 다시 시도
            print(".", end="", flush=True)
            time.sleep(5)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nWorker가 중지되었습니다.")
~~~

# 실행 방법
사전 준비:
 * MongoDB 설치 및 실행: 로컬 머신에 MongoDB가 설치되어 있고 mongodb://localhost:27017에서 실행 중인지 확인하세요.
 * pymongo 설치:
   pip install pymongo

 * 파일 저장: 위 4개의 코드 블록(Job_manager.py, sample_task.py, Producer.py, Worker.py)을 모두 같은 디렉토리에 저장합니다.
실행 순서:
 * 터미널 1: Worker 실행
   * 첫 번째 터미널을 열고 Worker.py를 실행합니다. 이 워커는 새로운 작업이 등록되기를 기다립니다.
   <!-- end list -->
   python Worker.py

 * (선택) 터미널 2, 3...: 추가 Worker 실행
   * 분산 처리를 확인하고 싶다면, 다른 터미널들을 열고 각각 Worker.py를 실행합니다.
   <!-- end list -->
   python Worker.py

 * 터미널 4: Producer 실행
   * 이제 다른 터미널에서 Producer.py를 실행하여 MongoDB에 작업을 추가합니다.
   <!-- end list -->
   python Producer.py

   * 실행 즉시, 대기 중이던 워커들 중 하나가 즉시 실행 가능한 작업들을 가져가 처리하기 시작하는 것을 볼 수 있습니다. 예약된 작업은 1분 후에 실행됩니다.
MongoDB 문서 구조 예시
작업이 완료되면 MongoDB의 job_db 데이터베이스에 있는 jobs 컬렉션에서 다음과 같은 형태의 문서를 확인할 수 있습니다.
~~~
{
  "_id": ObjectId("66b055d2a8c3d2e1b4a8e0f5"),
  "request_name": "Immediate Analysis Task",
  "status": "completed",
  "created_at": ISODate("2025-08-08T01:30:26.123Z"),
  "updated_at": ISODate("2025-08-08T01:30:35.456Z"),
  "scheduled_date": ISODate("2025-08-08T01:30:26.123Z"),
  "python_path": "/path/to/your/project/sample_task.py",
  "python_args": [
    "arg1",
    "value1",
    "arg2",
    "value2"
  ],
  "required_memory": 256,
  "logs": [
    "[2025-08-08T01:30:26.123456+00:00] Job created by producer.",
    "[2025-08-08T01:30:27.001234+00:00] Job picked up by worker (PID: 12345).",
    "[2025-08-08T01:30:35.456789+00:00] 작업 성공.\n--- STDOUT ---\n--- Sample Task 시작 ---\n전달받은 인자: ['arg1', 'value1', 'arg2', 'value2']\n5초 동안 대기합니다...\n--- Sample Task 성공적으로 완료 ---\n\n--- STDERR ---\n\n"
  ]
}
~~~
