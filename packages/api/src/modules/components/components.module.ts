import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';

@Module({
  controllers: [ComponentsController],
  providers: [PrismaService, ComponentsService],
})
export class ComponentsModule {}
