# Scalable Job Importer

A scalable job import system that fetches jobs from external XML feeds, processes them using Redis queues, and stores them in MongoDB with upsert logic.

---

## Tech Stack
- Frontend: Next.js
- Backend: Node.js + Express
- Database: MongoDB
- Queue: BullMQ
- Cache: Redis

---

## How to Run (Backend)

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Redis (local or cloud)

### Setup

```bash
cd server
npm install


```
### Create a .env file inside /server:

```bash
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
```

## Start the Server
```bash
node src/server.js
```
after running the server make an api call 

POST /api/run-import

in the body use json

{
  "feedUrl": "https://jobicy.com/?feed=job_feed&job_categories=copywriting"
}

## View Import History

GET /api/import-logs