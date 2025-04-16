import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { FilterPropertiesDto } from './dto/filter-property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly repo: PropertyRepository) {}

  async getFilteredProperties(filter: FilterPropertiesDto) {
    return this.repo.findWithFilters(filter);
  }
}
