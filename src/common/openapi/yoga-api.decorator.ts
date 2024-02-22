import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export type YogaApiOptions = {
  tag: string;
  summary: string;
  description: string;
  apiId: string;
};

export function YogaApi(options: YogaApiOptions) {
  const decorators = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  ];

  decorators.push(ApiTags(options.tag));
  return applyDecorators(...decorators);
}
