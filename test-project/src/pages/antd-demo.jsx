import React from 'react';
import AntdExample from '../components/AntdExample';

const AntdDemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Ant Design 데모
        </h1>
        <AntdExample />
      </div>
    </div>
  );
};

export default AntdDemoPage; 