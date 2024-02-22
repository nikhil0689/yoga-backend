import { UserResponseDTO } from './dtos/user.dto';
import { User } from './user.entity';
import { UserModel } from './user.model';

export class UserMap {
  static toDomain(model: UserModel): User {
    if (!model) {
      return null;
    }
    const { id, name, email, phone, address, createdAt, updatedAt } = model;

    const projectedProps = {
      id,
      name,
      email,
      phone,
      address,
      createdAt,
      updatedAt,
    };
    return User.create(projectedProps);
  }

  static toPersistence(entity: User): UserModel {
    const { name, email, phone, address, familyId } = entity.props;
    const raw = {
      name,
      email,
      phone,
      address,
      familyId,
    };
    return raw as UserModel;
  }

  static toUserDTO(entity: User): UserResponseDTO {
    if (entity === null) {
      return null;
    }
    const { id, name, email, phone, address, isOwner, createdAt, updatedAt } =
      entity;
    return {
      id,
      name,
      email,
      phone,
      address,
      isOwner,
      createdAt,
      updatedAt,
    };
  }
}
