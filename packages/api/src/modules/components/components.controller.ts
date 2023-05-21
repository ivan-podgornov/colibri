import { Body, Controller, Post } from '@nestjs/common';
import { Component, Prisma } from '@prisma/client';
import { ComponentsService } from './components.service';

@Controller('/components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  create(@Body() data: Prisma.ComponentCreateInput): Promise<Component> {
    return this.componentsService.create(data);
  }
}
