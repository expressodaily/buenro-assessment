import { Injectable } from '@nestjs/common';
import { SourceHandler } from './handler.interface';
import { Source2Transformer } from '../transformers/source2.transformer';
import { SOURCE_2_URL } from '../ingestion.constants';
import { JsonDownloaderService } from 'src/common/utils/json-downloader.service';

@Injectable()
export class Source2Handler implements SourceHandler {
  constructor(
    private readonly downloader: JsonDownloaderService,
    private readonly transformer: Source2Transformer,
  ) {}

  async streamAndTransform(
    onBatch: (items: any[]) => Promise<void>,
  ): Promise<void> {
    await this.downloader.streamJsonArrayBatch(
      SOURCE_2_URL,
      async (rawBatch) => {
        const transformed = rawBatch.map((item) =>
          this.transformer.transform(item),
        );
        await onBatch(transformed);
      },
      500,
    );
  }
}
