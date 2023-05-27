import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Colibri API')
    .setDescription('API for colibri panel')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  const port = Number(process.env.PORT) || 3002;

  await app.listen(port, () => {
    console.log(`API has been started on the port ${port}`);
  });
}
