// property.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { FilterPropertiesDto } from './dto/filter-property.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getFilteredProperties(@Query() filters: FilterPropertiesDto) {
    return this.propertyService.getFilteredProperties(filters);
  }
}
