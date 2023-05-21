import type { Component } from '@prisma/client';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class ComponentDto implements Component {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  componentName!: string;

  @ApiProperty()
  packageName!: string;

  @ApiProperty()
  src!: string;

  @ApiProperty({ type: String, nullable: true })
  developmentSrc!: string | null;

  @ApiProperty({ type: String, nullable: true })
  stageSrc!: string | null;
}

export class ComponentDtoConstuctorOptions extends OmitType(ComponentDto, ['id']) {}
