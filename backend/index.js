require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://jobboard_user:password123@localhost:5432/jobboard`,
});

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'vinni3339';

app.get('/', (req, res) => {
  res.send('Job Board API is running!');
});

// Get all jobs
app.get('/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get job details by ID
app.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

// Submit a job application
app.post('/applications', async (req, res) => {
  const { job_id, name, email, resume_link, cover_letter } = req.body;
  if (!job_id || !name || !email || !resume_link || !cover_letter) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    await pool.query(
      'INSERT INTO applications (job_id, name, email, resume_link, cover_letter) VALUES ($1, $2, $3, $4, $5)',
      [job_id, name, email, resume_link, cover_letter]
    );
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get all applications (admin view)
app.get('/applications', async (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 