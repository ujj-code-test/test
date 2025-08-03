import React from 'react';
import AgGridExample from '../components/AgGridExample';

const AgGridDemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          AG Grid 데모
        </h1>
        <AgGridExample />
      </div>
    </div>
  );
};

export default AgGridDemoPage; 