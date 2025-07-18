import React from 'react';
import { useParams } from 'react-router-dom';

const ApplicationForm: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  return (
    <div>
      <h1>Apply for Job</h1>
      <p>Job ID: {jobId}</p>
      {/* Application form will go here */}
    </div>
  );
};

export default ApplicationForm; 