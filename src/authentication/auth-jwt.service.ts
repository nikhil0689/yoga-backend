import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
import appConfig from '../config/app-config';
import { User } from '../user/user.entity';

@Injectable()
export class AuthJwtService {
  constructor(private jwtService: JwtService) {}

  /**
   * Generate Access Token
   * @param user
   * @returns Access Token
   */
  async generateAccessToken(user: User): Promise<string> {
    const jwtPayload = {
      sub: user.uniqueId,
    };
    const jwtSignOptions: JwtSignOptions = {
      algorithm: appConfig().jwtAlgorithm as Algorithm,
      expiresIn: appConfig().accessTokenExpiresIn,
      secret: appConfig().accessSecret,
    };
    const jwtString = await this.jwtService.signAsync(
      jwtPayload,
      jwtSignOptions,
    );
    return jwtString;
  }

  /**
   * Generate Refresh Token
   * @param user
   * @returns Refresh Token
   */
  async generateRefreshToken(user: User): Promise<string> {
    const jwtPayload = {
      sub: user.uniqueId,
    };
    const jwtSignOptions: JwtSignOptions = {
      algorithm: appConfig().jwtAlgorithm as Algorithm,
      expiresIn: appConfig().refreshTokenExpiresIn,
      secret: appConfig().refreshSecret,
    };
    const jwtString = await this.jwtService.signAsync(
      jwtPayload,
      jwtSignOptions,
    );
    return jwtString;
  }
}
