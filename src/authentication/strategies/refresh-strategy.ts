import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import appConfig from 'src/config/app-config';
import { Request } from 'express';
import { Strategy } from 'passport-local';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(readonly authService: AuthenticationService) {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: appConfig().refreshSecret,
      passReqToCallback: true,
    });
  }

  private static extractJWT(req: Request): string | null {
    let token = null;
    if (req.cookies) {
      token = req.cookies['jwt'];
      return token;
    }
    return null;
  }

  async validate(req: Request, payload: any): Promise<any> {
    const refreshToken = req.cookies.jwt;
    return {
      ...payload,
      refreshToken,
    };
  }
}
