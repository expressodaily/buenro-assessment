import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FilterPropertiesDto } from './dto/filter-property.dto';
import { PRICE_SEGMENT_RANGES } from 'src/common/utils/price-segment.util';

@Injectable()
export class PropertyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async batchUpsert(data: any[]) {
    const operations = data.map((item) =>
      this.prisma.property.upsert({
        where: { externalId: item.externalId },
        update: item,
        create: item,
      }),
    );

    await this.prisma.$transaction(operations);
  }

  async findWithFilters(filter: FilterPropertiesDto) {
    const {
      page = 1,
      length = 20,
      keyword,
      city,
      name,
      country,
      isAvailable,
      minPrice,
      maxPrice,
      priceSegment,
    } = filter;

    const where: any = {};

    if (keyword) {
      where.OR = [
        { name: { contains: keyword, mode: 'insensitive' } },
        { city: { contains: keyword, mode: 'insensitive' } },
        { country: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (country) {
      where.country = { contains: country, mode: 'insensitive' };
    }

    if (isAvailable !== undefined) {
      where.isAvailable = isAvailable;
    }

    if (priceSegment) {
      where.priceForNight = PRICE_SEGMENT_RANGES[priceSegment];
    }

    if (minPrice || maxPrice) {
      where.priceForNight = where.priceForNight || {};
      if (minPrice !== undefined) where.priceForNight.gte = minPrice;
      if (maxPrice !== undefined) where.priceForNight.lte = maxPrice;
    }

    const skip = (page - 1) * length;
    const take = length;

    const [totalItems, data] = await this.prisma.$transaction([
      this.prisma.property.count({ where }),
      this.prisma.property.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data,
      pagination: {
        totalItems,
        page,
        totalPages: Math.ceil(totalItems / length),
        itemsPerPage: length,
      },
    };
  }
}
