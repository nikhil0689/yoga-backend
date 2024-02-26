import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle(process.env.TITLE)
  .setDescription(process.env.DESCRIPTION)
  .setVersion(process.env.MAJOR + '.' + process.env.MINOR)
  .addBearerAuth()
  .build();

export const configureOpenAPI = (app: INestApplication): OpenAPIObject => {
  const openAPIDoc = SwaggerModule.createDocument(app, options);
  const version = process.env.VERSION;
  SwaggerModule.setup(`api/${version}`, app, openAPIDoc);
  return openAPIDoc;
};
