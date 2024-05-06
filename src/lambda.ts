import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { configureOpenAPI } from './common/openapi/configure-open-api';
import appConfig from './config/app-config';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);

    const version = appConfig().version;
    const globalPrefix = `api/${version}`;

    nestApp.use(cookieParser());

    nestApp.enableCors({
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
    nestApp.setGlobalPrefix(globalPrefix);

    // Turn on validation in all controllers using class-validator
    nestApp.useGlobalPipes(new ValidationPipe());

    // Configure Open API
    configureOpenAPI(nestApp);

    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
