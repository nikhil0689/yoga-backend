import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureOpenAPI } from './common/openapi/configure-open-api';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const version = process.env.VERSION;
  const globalPrefix = `api/${version}`;

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://yoga-ui.s3-website-us-east-1.amazonaws.com',
      'https://main.d8fnim7i7nrfb.amplifyapp.com/',
      'https://18.208.249.139',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'authorization',
    ],
    credentials: true,
  });
  console.log('cors passed');

  // Route prefix
  app.setGlobalPrefix(globalPrefix);

  // Turn on validation in all controllers using class-validator
  app.useGlobalPipes(new ValidationPipe());

  // Configure Open API
  configureOpenAPI(app);

  const port = process.env.SERVER_PORT;
  await app.listen(port);
  console.log('server started on port: ', port);
}
bootstrap();
