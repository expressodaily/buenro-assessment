import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './common/prisma/prisma.service';
import { TaskModule } from './tasks/task.module';
import { PropertyModule } from './property/property.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TaskModule,
    IngestionModule,
    PropertyModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
