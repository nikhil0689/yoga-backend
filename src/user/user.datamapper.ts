import { User } from './user.entity';
import { UserModel } from './user.model';

export class UserMap {
  static toDomain(model: UserModel): User {
    if (!model) {
      return null;
    }
    const {
      id,
      uniqueId,
      firstName,
      lastName,
      email,
      password,
      createdAt,
      updatedAt,
    } = model;
    const projectedProps = {
      id,
      uniqueId,
      firstName,
      lastName,
      email,
      password,
      createdAt,
      updatedAt,
    };
    return User.create(projectedProps);
  }
}
