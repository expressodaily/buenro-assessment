import { Injectable } from '@nestjs/common';
import { SourceHandler } from './handler.interface';
import { Source1Transformer } from '../transformers/source1.transformer';
import { SOURCE_1_URL } from '../ingestion.constants';
import { JsonDownloaderService } from 'src/common/utils/json-downloader.service';

@Injectable()
export class Source1Handler implements SourceHandler {
  constructor(
    private readonly downloader: JsonDownloaderService,
    private readonly transformer: Source1Transformer,
  ) {}

  async fetchAndTransform(): Promise<any[]> {
    const rawData = await this.downloader.fetchJsonArray(SOURCE_1_URL);

    return rawData.map((item) => this.transformer.transform(item));
  }
}
