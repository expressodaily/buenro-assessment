import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Transformer } from './transformer.interface';

@Injectable()
export class Source1Transformer implements Transformer<any, Prisma.PropertyCreateInput> {
  transform(item: any): Prisma.PropertyCreateInput {
    return {
      source: 'source_1',
      externalId: item.id.toString(),
      name: item.name,
      city: item.address?.city,
      country: item.address?.country,
      isAvailable: item.isAvailable,
      priceForNight: item.priceForNight,
    };  
  }
}