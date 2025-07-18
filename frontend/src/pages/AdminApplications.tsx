import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ADMIN_TOKEN = 'vinni3339'; // Should match backend

const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('admin_token'));
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!loggedIn) return;
    setLoading(true);
    axios.get('http://localhost:5001/applications', {
      headers: { 'x-admin-token': localStorage.getItem('admin_token') || '' }
    })
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load applications');
        setLoading(false);
      });
  }, [loggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_TOKEN) {
      localStorage.setItem('admin_token', ADMIN_TOKEN);
      setLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setLoggedIn(false);
    setApplications([]);
    setPassword('');
    setError('');
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '4rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.5rem', color: '#222' }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.8rem 1.5rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem' }}>Login</button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '2rem', color: '#222' }}>All Applications</h1>
        <button onClick={handleLogout} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
      </div>
      {loading ? (
        <div>Loading applications...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : applications.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#e3eafc' }}>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Job ID</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Resume</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Cover Letter</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.7rem' }}>{app.id}</td>
                  <td style={{ padding: '0.7rem' }}>{app.job_id}</td>
                  <td style={{ padding: '0.7rem' }}>{app.name}</td>
                  <td style={{ padding: '0.7rem' }}>{app.email}</td>
                  <td style={{ padding: '0.7rem' }}><a href={app.resume_link} target="_blank" rel="noopener noreferrer">Resume</a></td>
                  <td style={{ padding: '0.7rem', maxWidth: 200, wordBreak: 'break-word' }}>{app.cover_letter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminApplications; 