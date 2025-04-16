# Buenro Data Ingestor
This project is a data ingestion service for processing and transforming property listings from multiple external JSON sources with different data structures. It unifies the data into a common format and stores it in MongoDB for easy attribute-based querying and search.
## How to Run the Solution

### 1. Clone the repository

```bash
git clone https://github.com/expressodaily/buenro-assessment.git
cd buenro-data-ingestor
```

### 2. Start MongoDB with Docker
```
docker-compose up -d
```
### 3. Install dependencies
```
yarn install
```
### 4. Create required indexes (run once)
```
npm run create-indexes
```
### 5. Start the app
```
npm run start:dev
```

## Trigger Manual Ingestion
You can manually trigger data ingestion at any time without waiting for the cron schedule:
```
npm run direct-ingest
```
## How to Extend for New JSON Sources
The project is designed to be extensible and modular.

To add support for a new external JSON file with a different schema:
### 1. Add a new Handler
Create a new file under:
```
/src/ingestion/handlers/source3.handler.ts
```
### 2. Add a new Transformer
Create the transformer under:
```
/src/ingestion/transformers/source3.transformer.ts
```
This converts the raw data into the internal Property format.

### 3. Register in IngestionModule

Update ingestion.module.ts to register the new handler and transformer.

### 4. Call it in IngestionService

Add your new handler to the ingestion orchestration flow inside ingestion.service.ts.

## Tech Stack
Backend: NestJS

Database: MongoDB (via Docker)

ORM: Prisma

Scheduler: @nestjs/schedule (cron job at 08:00 UTC)

Ingestion: Axios + Stream-JSON for large JSON streaming

Querying: DTO-based filters with pagination and compound indexes

Indexing: Setup via scripts/create-indexes.ts