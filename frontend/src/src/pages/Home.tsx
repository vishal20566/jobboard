import React from 'react';
import { Link } from 'react-router-dom';

const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Solutions',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Innovatech',
    location: 'New York, NY',
    type: 'Part-time',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Minds',
    location: 'San Francisco, CA',
    type: 'Remote',
  },
];

const Home: React.FC = () => {
  return (
    <div>
      <h1>Job Listings</h1>
      <div>
        {mockJobs.map((job) => (
          <div key={job.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 