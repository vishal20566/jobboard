import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/jobs/${id}`)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load job details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading job details...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      minHeight: '80vh',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: '2rem',
        maxWidth: 600,
        marginLeft: 0,
        marginRight: 'auto',
        width: '100%',
      }}>
        <h1>{job.title}</h1>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Type:</strong> {job.type}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <Link to={`/apply/${job.id}`} style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', background: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>Apply</Link>
      </div>
    </div>
  );
};

export default JobDetail; 