import { Entity, proxyEntity } from 'entity';
import { User } from 'src/user/user.entity';

export interface UserFamilyProps {
  readonly familyName: string;
  readonly ownerId: number;
  readonly owner?: User;
}

export class UserFamily extends Entity<UserFamilyProps> {
  private constructor(props: UserFamilyProps) {
    super(props);
  }
  static create(props: UserFamilyProps): UserFamily {
    return proxyEntity(new UserFamily(props));
  }
}
