import { Entity, proxyEntity } from 'entity';

export interface UserProps {
  readonly name: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
  readonly familyId?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateUserProps {
  readonly name: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
  readonly family?: string;
}

export interface UpdateUserProps {
  readonly name?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
  readonly familyId?: number;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }
  static create(props: UserProps): User {
    return proxyEntity(new User(props));
  }
}
