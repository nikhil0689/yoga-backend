import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureOpenAPI } from './common/openapi/configure-open-api';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import appConfig from './config/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const version = appConfig().version;
  const globalPrefix = `api/${version}`;

  app.use(cookieParser());

  app.enableCors({
    origin: [appConfig().origin],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'authorization',
    ],
    credentials: true,
  });

  // Route prefix
  app.setGlobalPrefix(globalPrefix);

  // Turn on validation in all controllers using class-validator
  app.useGlobalPipes(new ValidationPipe());

  // Configure Open API
  configureOpenAPI(app);

  const port = appConfig().serverPort;
  await app.listen(port);
}
bootstrap();
