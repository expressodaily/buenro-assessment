import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyRepository } from './property.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository, PrismaService],
})
export class PropertyModule {}
