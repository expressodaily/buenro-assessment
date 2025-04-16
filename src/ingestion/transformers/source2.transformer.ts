import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Transformer } from './transformer.interface';

@Injectable()
export class Source2Transformer implements Transformer<any, Prisma.PropertyCreateInput> {
  transform(item: any): Prisma.PropertyCreateInput {
    return {
      source: 'source_2',
      externalId: item.id,
      name: null,
      city: item.city,
      country: null,
      isAvailable: item.availability,
      priceForNight: parseInt(item.pricePerNight),
      priceSegment: item.priceSegment,
    };
  }
}
