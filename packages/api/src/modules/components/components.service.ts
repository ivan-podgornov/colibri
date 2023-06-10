import { Injectable } from '@nestjs/common';
import { Component, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ComponentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(componentData: Prisma.ComponentCreateInput): Promise<Component> {
    return this.prisma.component.create({ data: componentData });
  }
}
