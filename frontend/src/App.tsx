import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import ApplicationForm from './pages/ApplicationForm';
import AdminApplications from './pages/AdminApplications';

function App() {
  return (
    <Router>
      <div className="logo-bg"></div>
      <div className="main-content">
        <nav style={{
          padding: '1rem 2rem',
          background: '#fff',
          borderBottom: '1px solid #e5e5e5',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}>
          <Link to="/" style={{ fontWeight: 600, fontSize: '1.2rem', marginRight: '2rem' }}>Home</Link>
          <Link to="/admin/applications" style={{ fontWeight: 600, fontSize: '1.2rem' }}>Admin Applications</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/apply/:jobId" element={<ApplicationForm />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
