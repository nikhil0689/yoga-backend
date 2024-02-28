import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureOpenAPI } from './common/openapi/configure-open-api';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const version = process.env.VERSION;
  const globalPrefix = `api/${version}`;

  // Route prefix
  app.setGlobalPrefix(globalPrefix);

  // Turn on validation in all controllers using class-validator
  app.useGlobalPipes(new ValidationPipe());

  // Configure Open API
  configureOpenAPI(app);

  const port = process.env.SERVER_PORT ?? 3001;
  await app.listen(port);
}
bootstrap();
