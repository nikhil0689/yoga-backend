import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureOpenAPI } from './common/openapi/configure-open-api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = `api/v1`;

  // Route prefix
  app.setGlobalPrefix(globalPrefix);

  // Configure Open API
  configureOpenAPI(app);

  const port = process.env.SERVER_PORT ?? 3001;
  await app.listen(port);
  console.log('Server started on port: ', port);
}
bootstrap();
