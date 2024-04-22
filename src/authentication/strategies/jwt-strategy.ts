import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import appConfig from 'src/config/app-config';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly authService: AuthenticationService,
    readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().accessSecret,
    });
  }

  async validate(payload: any): Promise<User> {
    console.log('payload: ', payload);
    const { sub: userId } = payload;
    const user = await this.userService.getUserById(userId);
    return user;
  }
}
