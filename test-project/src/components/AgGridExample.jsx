import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Card, Button, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

// AG Grid CSS
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridExample = () => {
  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: '김철수',
      age: 32,
      city: '서울',
      country: '대한민국',
      salary: 50000,
      department: '개발팀',
      startDate: '2020-01-15',
    },
    {
      id: 2,
      name: '이영희',
      age: 28,
      city: '부산',
      country: '대한민국',
      salary: 45000,
      department: '디자인팀',
      startDate: '2021-03-20',
    },
    {
      id: 3,
      name: '박민수',
      age: 35,
      city: '대구',
      country: '대한민국',
      salary: 60000,
      department: '마케팅팀',
      startDate: '2019-07-10',
    },
    {
      id: 4,
      name: '최지영',
      age: 26,
      city: '인천',
      country: '대한민국',
      salary: 40000,
      department: '개발팀',
      startDate: '2022-01-05',
    },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);

  const columnDefs = useMemo(() => [
    {
      field: 'name',
      headerName: '이름',
      sortable: true,
      filter: true,
      editable: true,
      width: 120,
    },
    {
      field: 'age',
      headerName: '나이',
      sortable: true,
      filter: 'agNumberColumnFilter',
      editable: true,
      width: 80,
    },
    {
      field: 'city',
      headerName: '도시',
      sortable: true,
      filter: true,
      editable: true,
      width: 100,
    },
    {
      field: 'country',
      headerName: '국가',
      sortable: true,
      filter: true,
      editable: true,
      width: 100,
    },
    {
      field: 'salary',
      headerName: '급여',
      sortable: true,
      filter: 'agNumberColumnFilter',
      editable: true,
      width: 100,
      valueFormatter: (params) => {
        return new Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
        }).format(params.value);
      },
    },
    {
      field: 'department',
      headerName: '부서',
      sortable: true,
      filter: true,
      editable: true,
      width: 120,
    },
    {
      field: 'startDate',
      headerName: '입사일',
      sortable: true,
      filter: 'agDateColumnFilter',
      editable: true,
      width: 120,
    },
    {
      headerName: '작업',
      width: 150,
      cellRenderer: (params) => (
        <Space>
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(params.data)}
          >
            수정
          </Button>
          <Button
            size="small"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(params.data.id)}
          >
            삭제
          </Button>
        </Space>
      ),
    },
  ], []);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
    floatingFilter: true,
  }), []);

  const handleEdit = (rowData) => {
    message.info(`${rowData.name}의 정보를 수정합니다.`);
  };

  const handleDelete = (id) => {
    setRowData(prevData => prevData.filter(row => row.id !== id));
    message.success('행이 삭제되었습니다.');
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      name: '새 직원',
      age: 25,
      city: '서울',
      country: '대한민국',
      salary: 35000,
      department: '신입팀',
      startDate: new Date().toISOString().split('T')[0],
    };
    setRowData(prevData => [...prevData, newRow]);
    message.success('새 행이 추가되었습니다.');
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      message.warning('삭제할 행을 선택해주세요.');
      return;
    }
    
    setRowData(prevData => 
      prevData.filter(row => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
    message.success(`${selectedRows.length}개의 행이 삭제되었습니다.`);
  };

  const onSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedIds = selectedNodes.map(node => node.data.id);
    setSelectedRows(selectedIds);
  };

  const onCellValueChanged = (event) => {
    const { data, field, newValue } = event;
    message.success(`${data.name}의 ${field}가 ${newValue}로 변경되었습니다.`);
  };

  return (
    <div className="p-6">
      <Card title="AG Grid 예제" className="mb-6">
        <p className="mb-4">
          AG Grid를 사용한 고급 데이터 테이블 예제입니다. 정렬, 필터링, 편집 기능을 포함합니다.
        </p>
        
        <Space className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddRow}
          >
            새 행 추가
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            선택된 행 삭제 ({selectedRows.length})
          </Button>
        </Space>

        <div
          className="ag-theme-alpine"
          style={{ height: 500, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            animateRows={true}
            pagination={true}
            paginationPageSize={10}
            onSelectionChanged={onSelectionChanged}
            onCellValueChanged={onCellValueChanged}
            suppressRowClickSelection={true}
            enableRangeSelection={true}
            enableFillHandle={true}
            enableCellTextSelection={true}
          />
        </div>
      </Card>
    </div>
  );
};

export default AgGridExample; 