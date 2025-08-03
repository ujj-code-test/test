import React from 'react';
import ChartExample from '../components/ChartExample';

const ChartDemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Chart.js 데모
        </h1>
        <ChartExample />
      </div>
    </div>
  );
};

export default ChartDemoPage; 