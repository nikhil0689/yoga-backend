import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user;
    const userId = user.uniqueId || user.sub;
    return userId as unknown as string;
  },
);
