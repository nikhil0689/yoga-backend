import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RefreshTokenTracker } from './refresh-token-tracker.entity';
import { RefreshTokenTrackerRepository } from './refresh-token-tracker.repository';

@Injectable()
export class RefreshTokenTrackerService {
  constructor(
    private readonly refreshTokenTrackerRepository: RefreshTokenTrackerRepository,
  ) {}

  /**
   * Create a new Refresh Token Tracker Record
   * @param refreshTokenHash
   * @param userId
   */
  async saveIssuedRefreshToken(
    refreshTokenHash: string,
    userId: string,
  ): Promise<void> {
    const refreshTokenTracker = RefreshTokenTracker.create({
      refreshTokenHash,
      userId,
    });
    await this.refreshTokenTrackerRepository.createRefreshTokenEntry(
      refreshTokenTracker,
    );
  }

  /**
   * Get Refresh Token Tracker for the User Id
   * @param userId
   * @returns Refresh Token Tracker Details
   */
  async getRefreshTokenHashByUserId(
    userId: string,
  ): Promise<RefreshTokenTracker> {
    const refreshToken =
      await this.refreshTokenTrackerRepository.getRefreshTokenHashByUserId(
        userId,
      );
    if (!refreshToken) {
      throw new HttpException(
        'Refresh token details not available for the user',
        HttpStatus.NOT_FOUND,
      );
    }
    return refreshToken;
  }

  /**
   * Delete the Refresh Token Hash for the User Id
   * @param userId
   */
  async deleteRefreshTokenByUserId(userId: string): Promise<void> {
    await this.refreshTokenTrackerRepository.deleteTokenByUserId(userId);
  }
}
