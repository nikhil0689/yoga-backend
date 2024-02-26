import { Entity, proxyEntity } from 'entity';

export interface RefreshTokenTrackerProps {
  refreshTokenHash: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class RefreshTokenTracker extends Entity<RefreshTokenTrackerProps> {
  private constructor(props: RefreshTokenTrackerProps) {
    super(props);
  }
  static create(
    props: RefreshTokenTrackerProps,
    id?: string,
  ): RefreshTokenTracker {
    return proxyEntity(new RefreshTokenTracker(props));
  }
}
