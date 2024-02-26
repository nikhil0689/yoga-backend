import { RefreshTokenTracker } from './refresh-token-tracker.entity';
import { RefreshTokenTrackerModel } from './refresh-token-tracker.model';

export class RefreshTokenTrackerMap {
  static toDomain(model: RefreshTokenTrackerModel): RefreshTokenTracker {
    if (!model) {
      return null;
    }
    const { refreshTokenHash, userId, createdAt, updatedAt } = model;
    const projectedProps = {
      refreshTokenHash,
      userId,
      createdAt,
      updatedAt,
    };
    return RefreshTokenTracker.create(projectedProps);
  }
}
