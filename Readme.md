# How to Run the Project

## Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- Redis (cloud or local)

## Setup Steps

1. Clone the repository
git clone <your-repo-url>
cd server

2. Install dependencies
npm install

3. Create a `.env` file in the server folder
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string

Note:
Redis eviction policy should be set to `noeviction` for best results.

4. Start the server
node src/server.js

Server will run on:
http://localhost:5000

## API Usage

Start job import:
POST http://localhost:5000/api/import

View import logs:
GET http://localhost:5000/api/import-logs

The system uses Redis queues (BullMQ) to process jobs asynchronously
and MongoDB upsert logic to handle large-scale job imports efficiently.
