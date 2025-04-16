import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { IngestionService } from 'src/ingestion/ingestion.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ingestionService = app.get(IngestionService);

  console.log('Starting manual data ingestion...');
  await ingestionService.ingestAll();
  console.log('Manual data ingestion completed.');

  await app.close();
}

bootstrap();
