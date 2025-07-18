import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const validateEmail = (email: string) => /.+@.+\..+/.test(email);
const validateURL = (url: string) => /^https?:\/\/.+\..+/.test(url);

const inputStyle = {
  width: '100%',
  padding: '0.7rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  marginBottom: '0.7rem',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.2s',
};
const labelStyle = {
  fontWeight: 600,
  marginBottom: '0.2rem',
  display: 'block',
};
const errorStyle = {
  color: 'red',
  fontSize: '0.95rem',
  marginBottom: '0.5rem',
};
const buttonStyle = {
  background: 'linear-gradient(90deg, #007bff 60%, #0056b3 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '0.8rem 1.5rem',
  fontWeight: 600,
  fontSize: '1.1rem',
  cursor: 'pointer',
  marginTop: '1rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'background 0.2s',
};
const successStyle = {
  color: 'green',
  fontWeight: 600,
  marginTop: '1rem',
};

const ApplicationForm: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [form, setForm] = useState({
    name: '',
    email: '',
    resume: '',
    coverLetter: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.resume.trim()) newErrors.resume = 'Resume URL is required.';
    else if (!validateURL(form.resume)) newErrors.resume = 'Invalid URL.';
    if (!form.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/applications`, {
        job_id: Number(jobId),
        name: form.name,
        email: form.email,
        resume_link: form.resume,
        cover_letter: form.coverLetter,
      });
      setSubmitStatus('Application submitted successfully!');
      setForm({ name: '', email: '', resume: '', coverLetter: '' });
      setErrors({});
    } catch (err) {
      setSubmitStatus('Failed to submit application.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      minHeight: '80vh',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '2.5rem 2rem',
        maxWidth: 500,
        marginLeft: 0,
        marginRight: 'auto',
        width: '100%',
      }}>
        <h1 style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '2rem', color: '#222' }}>
          Apply for Job ID: {jobId}
        </h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }} noValidate>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
            {errors.name && <div style={errorStyle}>{errors.name}</div>}
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Resume URL</label>
            <input name="resume" value={form.resume} onChange={handleChange} required style={inputStyle} />
            {errors.resume && <div style={errorStyle}>{errors.resume}</div>}
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Cover Letter</label>
            <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} required style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} />
            {errors.coverLetter && <div style={errorStyle}>{errors.coverLetter}</div>}
          </div>
          <button type="submit" style={buttonStyle}>Submit Application</button>
        </form>
        {submitStatus && <div style={submitStatus.includes('success') ? successStyle : errorStyle}>{submitStatus}</div>}
      </div>
    </div>
  );
};

export default ApplicationForm; 