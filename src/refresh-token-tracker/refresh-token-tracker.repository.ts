import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshTokenTrackerMap } from './refresh-token-tracker.datamapper';
import { RefreshTokenTracker } from './refresh-token-tracker.entity';
import { RefreshTokenTrackerModel } from './refresh-token-tracker.model';

@Injectable()
export class RefreshTokenTrackerRepository {
  constructor(
    @InjectModel(RefreshTokenTrackerModel)
    private refreshTokenModel: typeof RefreshTokenTrackerModel,
  ) {}

  async getRefreshTokenHashByUserId(
    userId: string,
  ): Promise<RefreshTokenTracker> {
    const instance = await this.refreshTokenModel.findOne({
      where: {
        userId,
      },
    });
    return RefreshTokenTrackerMap.toDomain(instance);
  }

  async deleteTokenByUserId(userId: string): Promise<void> {
    await this.refreshTokenModel.destroy({
      where: {
        userId,
      },
    });
  }

  async createRefreshTokenEntry(
    refreshTokenTracker: RefreshTokenTracker,
  ): Promise<void> {
    const { userId, refreshTokenHash } = refreshTokenTracker;
    const userTokenExists = await this.getRefreshTokenHashByUserId(userId);
    if (userTokenExists) {
      await this.refreshTokenModel.update(
        { refreshTokenHash },
        {
          where: {
            userId,
          },
        },
      );
      return;
    }
    await this.refreshTokenModel.create({
      userId,
      refreshTokenHash,
    });
  }
}
