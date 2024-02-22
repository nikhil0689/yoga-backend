import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle('YOGA')
  .setDescription('Students and Payment Management')
  .setVersion('1.0')
  .build();

export const configureOpenAPI = (app: INestApplication): OpenAPIObject => {
  const openAPIDoc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, openAPIDoc);
  return openAPIDoc;
};
