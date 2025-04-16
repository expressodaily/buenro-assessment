import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IngestionService } from 'src/ingestion/ingestion.service';

@Injectable()
export class IngestionCron {
  private readonly logger = new Logger(IngestionCron.name);

  constructor(private readonly ingestionService: IngestionService) {}

  @Cron('0 8 * * *')
  async handleIngestion() {
    this.logger.log('Running daily ingestion task...');
    try {
      await this.ingestionService.ingestAll();
      this.logger.log('Ingestion completed.');
    } catch (err) {
      this.logger.error('Ingestion failed', err);
    }
  }
}
