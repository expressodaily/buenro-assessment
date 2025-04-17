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
### 4. Generate Prisma Client
```
npx prisma generate
```
### 5. Create required indexes (run once)
```
npm run create-indexes
```
### 6. Start the app
```
npm run start:dev
```

## Trigger Manual Ingestion
You can manually trigger data ingestion at any time without waiting for the cron schedule:
```
npm run direct-ingest
```
## API Documentation
### GET /properties
Fetches a paginated list of property listings with optional filters.
#### Query Parameters
| Parameter      | Type     | Description                                  |
|----------------|----------|----------------------------------------------|
| `page`         | number   | Page number (default: `1`)                   |
| `length`       | number   | Items per page (default: `20`)               |
| `keyword`      | string   | Matches part of the `name`, `city`, or `country` fields |
| `city`         | string   | Filter by city name                          |
| `name`         | string   | Filter by property name                      |
| `country`      | string   | Filter by country name                       |
| `isAvailable`  | boolean  | Filter by availability (`true` or `false`)   |
| `minPrice`     | number   | Minimum price per night                      |
| `maxPrice`     | number   | Maximum price per night                      |
| `priceSegment` | string   | Filter by price segment (`budget`, `midrange`, `luxury`) |
#### Example Request
GET /properties?city=Warsaw&minPrice=100&maxPrice=300&page=2
#### Response Format

```json
{
  "data": [
    {
      "id": "propertyId",
      "name": "Modern Loft",
      "city": "Warsaw",
      "country": "Poland",
      "priceForNight": 120,
      "isAvailable": true,
      ...
    }
  ],
  "pagination": {
    "totalItems": 120,
    "page": 2,
    "totalPages": 6,
    "itemsPerPage": 20
  }
}
```
## ⏰ Scheduled Ingestion

The app includes a scheduled cron job to automatically ingest new property data every day at **08:00 UTC**.

### Cron Schedule
0 8 * * *
This job is defined in `IngestionCron` and triggers the ingestion flow via `ingestionService.ingestAll()`.

### Behavior

- Runs daily at **08:00 UTC**
- Logs start, completion, or failure of the ingestion process
- Uses NestJS `@Cron` decorator from `@nestjs/schedule`

You don't need to run anything manually — data stays up-to-date automatically!

If needed, you can still trigger ingestion manually:

```bash
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