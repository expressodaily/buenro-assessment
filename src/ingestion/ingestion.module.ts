import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { JsonDownloaderService } from '../common/utils/json-downloader.service';
import { Source1Handler } from './handlers/source1.handler';
import { Source2Handler } from './handlers/source2.handler';
import { PropertyRepository } from 'src/property/property.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Source1Transformer } from './transformers/source1.transformer';
import { Source2Transformer } from './transformers/source2.transformer';

@Module({
  providers: [
    IngestionService,
    JsonDownloaderService,
    Source1Handler,
    Source2Handler,
    Source1Transformer,
    Source2Transformer,
    PropertyRepository,
    PrismaService,
  ],
  exports: [IngestionService],
})
export class IngestionModule {}
