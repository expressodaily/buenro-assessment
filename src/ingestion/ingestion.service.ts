import { Injectable, Logger } from '@nestjs/common';
import { Source1Handler } from './handlers/source1.handler';
import { Source2Handler } from './handlers/source2.handler';
import { PropertyRepository } from 'src/property/property.repository';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private readonly propertyRepo: PropertyRepository,
    private readonly source1Handler: Source1Handler,
    private readonly source2Handler: Source2Handler,
  ) {}

  async ingestAll(): Promise<void> {
    const smallSources = [this.source1Handler.fetchAndTransform?.()];

    const smallDataResults = await Promise.all(
      smallSources.filter(Boolean) as Promise<any[]>[],
    );

    const smallCombined = smallDataResults.flat();
    if (smallCombined.length > 0) {
      await this.propertyRepo.batchUpsert(smallCombined);
    }

    // Handle large stream-based ingestion
    await this.source2Handler.streamAndTransform?.(async (batch) => {
      await this.propertyRepo.batchUpsert(batch);
    });
  }
}
