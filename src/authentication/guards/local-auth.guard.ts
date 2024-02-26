import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validateOrReject } from 'class-validator';
import { LoginDTO } from 'src/authentication/dtos/authentication.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.validateInput(context);
    return super.canActivate(context) as Promise<boolean>;
  }
  private async validateInput(context: ExecutionContext) {
    try {
      const { id, password } = context.switchToHttp().getRequest().body || {};
      const input = new LoginDTO();
      input.id = id;
      input.password = password;
      await validateOrReject(input, { validationError: { target: false } });
    } catch (error) {
      let errorMessage = null;
      if (Array.isArray(error)) {
        const errorMessageList = [];
        error.forEach((error) => {
          errorMessageList.push(...Object.values(error.constraints));
        });
        errorMessage = `Invalid input format: ${errorMessageList.join(', ')}`;
      } else {
        errorMessage = `Invalid input format: ${error}`;
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
