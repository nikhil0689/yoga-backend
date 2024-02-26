import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from 'src/authentication/authentication.entity';

export const RequestUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
