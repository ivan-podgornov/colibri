import { Module } from '@nestjs/common';
import { ComponentsModule } from './modules/components';

@Module({
  imports: [ComponentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
