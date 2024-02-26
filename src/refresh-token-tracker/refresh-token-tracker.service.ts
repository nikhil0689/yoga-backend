import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RefreshTokenTracker } from './refresh-token-tracker.entity';
import { RefreshTokenTrackerRepository } from './refresh-token-tracker.repository';

@Injectable()
export class RefreshTokenTrackerService {
  constructor(
    private readonly refreshTokenTrackerRepository: RefreshTokenTrackerRepository,
  ) {}

  /**
   * Create a new refresh token tracker record
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
   * Get refresh token tracker for the user id
   * @param userId
   * @returns refresh token tracker details
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
   * Delete the refresh token hash for the user id
   * @param userId
   */
  async deleteRefreshTokenByUserId(userId: string): Promise<void> {
    await this.refreshTokenTrackerRepository.deleteTokenByUserId(userId);
  }
}
