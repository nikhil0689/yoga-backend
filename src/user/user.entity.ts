import { Entity, proxyEntity } from 'entity';

export interface UserProps {
  readonly uniqueId: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface UserPropsWithoutPassword {
  readonly uniqueId: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }
  static create(props: UserProps): User {
    return proxyEntity(new User(props));
  }
}
