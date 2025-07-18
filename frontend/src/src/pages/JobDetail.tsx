import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Job Detail</h1>
      <p>Job ID: {id}</p>
      {/* Full job description and type will go here */}
    </div>
  );
};

export default JobDetail; 