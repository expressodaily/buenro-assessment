import { Module } from '@nestjs/common';
import { IngestionCron } from './ingestion.cron';
import { IngestionModule } from 'src/ingestion/ingestion.module';

@Module({
  imports: [IngestionModule],
  providers: [IngestionCron],
})
export class TaskModule {}
