import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/authentication/authentication.entity';

export const RequestUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub as unknown as string;
  },
);
