import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
} from 'chart.js';
import {
  Line,
  Bar,
  Doughnut,
  Pie,
  Radar,
  PolarArea,
  Scatter,
  Bubble,
} from 'react-chartjs-2';
import { Card, Row, Col, Select, Button, Space, InputNumber, message } from 'antd';
import { ReloadOutlined, DownloadOutlined } from '@ant-design/icons';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

const { Option } = Select;

const ChartExample = () => {
  const [selectedChart, setSelectedChart] = useState('line');
  const [dataPoints, setDataPoints] = useState(7);

  // 샘플 데이터 생성
  const generateData = (count) => {
    const labels = [];
    const data = [];
    const data2 = [];
    
    for (let i = 0; i < count; i++) {
      labels.push(`월 ${i + 1}`);
      data.push(Math.floor(Math.random() * 100) + 20);
      data2.push(Math.floor(Math.random() * 80) + 10);
    }
    
    return { labels, data, data2 };
  };

  const { labels, data, data2 } = generateData(dataPoints);

  // 라인 차트 데이터
  const lineData = {
    labels,
    datasets: [
      {
        label: '매출',
        data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: '비용',
        data: data2,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // 바 차트 데이터
  const barData = {
    labels,
    datasets: [
      {
        label: '제품 A',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
      {
        label: '제품 B',
        data: data2,
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
        borderColor: 'rgb(255, 206, 86)',
        borderWidth: 1,
      },
    ],
  };

  // 도넛 차트 데이터
  const doughnutData = {
    labels: ['빨강', '파랑', '노랑', '초록', '보라'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // 파이 차트 데이터
  const pieData = {
    labels: ['서울', '부산', '대구', '인천', '광주'],
    datasets: [
      {
        data: [300, 200, 150, 180, 120],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // 레이더 차트 데이터
  const radarData = {
    labels: ['속도', '힘', '지구력', '기술', '전략', '팀워크'],
    datasets: [
      {
        label: '선수 A',
        data: [85, 90, 75, 80, 70, 85],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
      },
      {
        label: '선수 B',
        data: [70, 85, 90, 75, 85, 80],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  // 극좌표 차트 데이터
  const polarAreaData = {
    labels: ['빨강', '파랑', '노랑', '초록', '보라'],
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // 산점도 차트 데이터
  const scatterData = {
    datasets: [
      {
        label: '그룹 A',
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
          { x: 15, y: 15 },
          { x: 20, y: 10 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: '그룹 B',
        data: [
          { x: -5, y: 15 },
          { x: 5, y: 5 },
          { x: 15, y: 20 },
          { x: 25, y: 15 },
          { x: 30, y: 25 },
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  };

  // 버블 차트 데이터
  const bubbleData = {
    datasets: [
      {
        label: '데이터셋 1',
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
          { x: 60, y: 50, r: 20 },
          { x: 80, y: 20, r: 12 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: '데이터셋 2',
        data: [
          { x: 30, y: 40, r: 18 },
          { x: 50, y: 60, r: 25 },
          { x: 70, y: 30, r: 15 },
          { x: 90, y: 70, r: 30 },
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  };

  // 공통 옵션
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js 예제',
      },
    },
  };

  // 차트 렌더링 함수
  const renderChart = () => {
    const chartProps = {
      data: {},
      options: commonOptions,
    };

    switch (selectedChart) {
      case 'line':
        chartProps.data = lineData;
        break;
      case 'bar':
        chartProps.data = barData;
        break;
      case 'doughnut':
        chartProps.data = doughnutData;
        break;
      case 'pie':
        chartProps.data = pieData;
        break;
      case 'radar':
        chartProps.data = radarData;
        break;
      case 'polarArea':
        chartProps.data = polarAreaData;
        break;
      case 'scatter':
        chartProps.data = scatterData;
        break;
      case 'bubble':
        chartProps.data = bubbleData;
        break;
      default:
        chartProps.data = lineData;
    }

    const chartComponents = {
      line: <Line {...chartProps} />,
      bar: <Bar {...chartProps} />,
      doughnut: <Doughnut {...chartProps} />,
      pie: <Pie {...chartProps} />,
      radar: <Radar {...chartProps} />,
      polarArea: <PolarArea {...chartProps} />,
      scatter: <Scatter {...chartProps} />,
      bubble: <Bubble {...chartProps} />,
    };

    return chartComponents[selectedChart] || chartComponents.line;
  };

  const handleRefresh = () => {
    message.success('차트 데이터가 새로고침되었습니다!');
  };

  const handleDownload = () => {
    message.info('차트 다운로드 기능은 구현 예정입니다.');
  };

  return (
    <div className="p-6">
      <Card title="Chart.js 예제" className="mb-6">
        <p className="mb-4">
          Chart.js를 사용한 다양한 차트 예제입니다. 라인, 바, 도넛, 파이, 레이더, 극좌표, 산점도, 버블 차트를 포함합니다.
        </p>
        
        <Space className="mb-4">
          <Select
            value={selectedChart}
            onChange={setSelectedChart}
            style={{ width: 150 }}
          >
            <Option value="line">라인 차트</Option>
            <Option value="bar">바 차트</Option>
            <Option value="doughnut">도넛 차트</Option>
            <Option value="pie">파이 차트</Option>
            <Option value="radar">레이더 차트</Option>
            <Option value="polarArea">극좌표 차트</Option>
            <Option value="scatter">산점도 차트</Option>
            <Option value="bubble">버블 차트</Option>
          </Select>
          
          <InputNumber
            min={3}
            max={20}
            value={dataPoints}
            onChange={setDataPoints}
            addonBefore="데이터 포인트"
          />
          
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
          >
            새로고침
          </Button>
          
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            다운로드
          </Button>
        </Space>

        <div style={{ height: 400 }}>
          {renderChart()}
        </div>
      </Card>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="차트 종류" size="small">
            <ul className="list-disc list-inside">
              <li><strong>라인 차트:</strong> 시간에 따른 변화 추이</li>
              <li><strong>바 차트:</strong> 카테고리별 비교</li>
              <li><strong>도넛 차트:</strong> 전체 대비 비율</li>
              <li><strong>파이 차트:</strong> 부분과 전체의 관계</li>
              <li><strong>레이더 차트:</strong> 다차원 데이터 비교</li>
              <li><strong>극좌표 차트:</strong> 각도와 거리 기반</li>
              <li><strong>산점도 차트:</strong> 두 변수 간의 관계</li>
              <li><strong>버블 차트:</strong> 3차원 데이터 표현</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="사용법" size="small">
            <ul className="list-disc list-inside">
              <li>차트 종류를 선택하여 다른 차트로 전환</li>
              <li>데이터 포인트 수를 조절하여 데이터 양 변경</li>
              <li>새로고침 버튼으로 랜덤 데이터 생성</li>
              <li>차트는 반응형으로 화면 크기에 맞춰 조정</li>
              <li>호버 시 상세 정보 확인 가능</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChartExample; 