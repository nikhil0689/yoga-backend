import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tokens } from './authentication.entity';
import { AuthJwtService } from './auth-jwt.service';
import { UserService } from 'src/user/user.service';
import { hash } from '../utils';
import { RefreshTokenTrackerService } from 'src/refresh-token-tracker/refresh-token-tracker.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private authJwtService: AuthJwtService,
    private userService: UserService,
    private refreshTokenTrackerService: RefreshTokenTrackerService,
  ) {}

  /**
   * Login using user data
   * @param user
   * @returns Access token and Refresh token
   */
  async login(user: User): Promise<Tokens> {
    // Generate access token
    const accessToken = await this.authJwtService.generateAccessToken(user);

    // Generate refresh token
    const refreshToken = await this.authJwtService.generateRefreshToken(user);

    // Update refresh token hash in the tracker for the user id
    await this.updateRefreshTokenHashByUserId(user.uniqueId, refreshToken);

    return { accessToken, refreshToken };
  }

  /**
   * Logout the user
   * @param userId
   */
  async logOut(userId: string): Promise<void> {
    // Delete the refresh token hash for the user
    await this.refreshTokenTrackerService.deleteRefreshTokenByUserId(userId);
  }

  /**
   * Get access token and refresh token for the user using refresh token
   * @param userId
   * @param refreshToken
   * @returns Access and Refresh tokens
   */
  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    // Get user details
    const user = await this.userService.getUserById(userId);

    // Compare if the refresh token in the input matches with the hash from tracker
    const incomingRefreshTokenHash = await hash(refreshToken);

    // Get refresh token tracker details from the tracker
    const { refreshTokenHash: existingHash } =
      await this.refreshTokenTrackerService.getRefreshTokenHashByUserId(userId);

    if (incomingRefreshTokenHash !== existingHash) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    // Generate access and refresh token
    const accessToken = await this.authJwtService.generateAccessToken(user);
    const newRefreshToken =
      await this.authJwtService.generateRefreshToken(user);

    // Update the new hash of refresh token in the tracker
    await this.updateRefreshTokenHashByUserId(user.uniqueId, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }

  /**
   * Validate user's unique id and password
   * @param id
   * @param pass
   * @returns
   */
  async validateUser(id: string, password: string): Promise<User> {
    const user = await this.userService.getUserById(id);

    if (user.password !== password) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const { uniqueId, email, firstName, lastName } = user;
    return User.create({ uniqueId, email, firstName, lastName });
  }

  /**
   * Update refresh token hash for the user
   * @param userId
   * @param refreshToken
   */
  async updateRefreshTokenHashByUserId(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await hash(refreshToken);
    await this.refreshTokenTrackerService.saveIssuedRefreshToken(
      hashedRefreshToken,
      userId,
    );
  }
}
