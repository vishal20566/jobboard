import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const jobTypes = ['All', 'Full-time', 'Part-time', 'Remote'];

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5001/jobs')
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load jobs');
        setLoading(false);
      });
  }, []);

  const filteredJobs = selectedType === 'All'
    ? jobs
    : jobs.filter(job => job.type === selectedType);

  return (
    <div>
      <h1>Job Listings</h1>
      <div style={{ marginBottom: '1.5rem' }}>
        {jobTypes.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              marginRight: '1rem',
              padding: '0.5rem 1.2rem',
              borderRadius: '4px',
              border: selectedType === type ? '2px solid #007bff' : '1px solid #ccc',
              background: selectedType === type ? '#e3eafc' : '#fff',
              color: '#222',
              fontWeight: selectedType === type ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {type}
          </button>
        ))}
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <div className="spinner" style={{
            width: 48,
            height: 48,
            border: '6px solid #e3eafc',
            borderTop: '6px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {filteredJobs.length === 0 ? (
            <div>No jobs found for this type.</div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} style={{
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                transition: 'box-shadow 0.2s',
              }}>
                <h2>{job.title}</h2>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <Link to={`/jobs/${job.id}`}>View Details</Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home; 