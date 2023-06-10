import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { ComponentsService } from './components.service';
import { ComponentDto, ComponentDtoConstuctorOptions } from './components.types';

@Controller('components')
@ApiTags('Components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  @ApiCreatedResponse({ type: ComponentDto })
  create(@Body() data: ComponentDtoConstuctorOptions): Promise<ComponentDto> {
    return this.componentsService.create(data);
  }
}
