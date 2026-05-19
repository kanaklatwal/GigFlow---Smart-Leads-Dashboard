## Setup

1. Clone repo

git clone <repo-url>

2. Install dependencies

npm install

3. Create .env file

Copy .env.example and add values

4. Run project

npm run dev

## API Endpoints

### Auth
POST /api/auth/register
POST /api/auth/login

### Leads
GET /api/leads
POST /api/leads
GET /api/leads/:id
PUT /api/leads/:id
DELETE /api/leads/:id

### Extra
PUT /api/leads/:id/assign
PUT /api/leads/:id/status
GET /api/leads/stats
GET /api/leads/export/csv

## Run with Docker

docker compose up --build