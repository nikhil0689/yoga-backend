import { UserResponseDTO } from './dtos/user.response.dto';
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

  static toUserResponseDTO(entity: User): UserResponseDTO {
    if (entity === null) {
      return null;
    }

    const { uniqueId, firstName, lastName, email, createdAt, updatedAt } =
      entity;

    const dto: UserResponseDTO = {
      uniqueId,
      firstName,
      lastName,
      email,
      createdAt,
      updatedAt,
    };

    return dto;
  }
}
