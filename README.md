# Job Board

A simple job board app with Node.js, Express, PostgreSQL, and React.

## Submission Checklist
- [x] Public GitHub repo (or zip)
- [x] README.md with local-run + DB init steps
- [x] Seed / migration files
- [x] Live demo link

## Local Setup

### Backend

1. `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```
   DATABASE_URL=postgresql://jobboard_user:password123@localhost:5432/jobboard
   ADMIN_TOKEN=vinni3339
   PORT=5001
   ```
4. Initialize the database (see below).
5. Start the server: `npm start`

### Frontend

1. `cd frontend`
2. Install dependencies: `npm install`
3. Start the app: `npm start`
4. The app runs at [http://localhost:3000](http://localhost:3000)

## Database Initialization

1. Install PostgreSQL and create a database:
   ```sh
   createdb jobboard
   ```
2. Run the migration and seed files:
   ```sh
   psql -d jobboard -f backend/migrations/001_create_tables.sql
   psql -d jobboard -f backend/seeds/001_seed_jobs.sql
   ```

## Migrations & Seeds

- Migration files: `backend/migrations/`
- Seed files: `backend/seeds/`

## Live Demo

[Live Demo Link](https://your-demo-link.com)

---

Feel free to update the live demo link after deployment. 