import { UserMap } from 'src/user/user.datamapper';
import { UserFamilyResponseDTO } from './dtos/user_family.dto';
import { UserFamily } from './user_family.entity';
import { UserFamilyModel } from './user_family.model';

export class UserFamilyMap {
  static toDomain(model: UserFamilyModel): UserFamily {
    if (!model) {
      return null;
    }
    const { id, familyName, ownerId, owner, createdAt, updatedAt } = model;
    let ownerDetails = null;
    if (owner) {
      ownerDetails = UserMap.toDomain(owner);
    }
    const projectedProps = {
      id,
      familyName,
      ownerId,
      owner: ownerDetails,
      createdAt,
      updatedAt,
    };
    return UserFamily.create(projectedProps);
  }

  static toPersistence(entity: UserFamily): UserFamilyModel {
    const { familyName, ownerId } = entity.props;
    const raw = {
      familyName,
      ownerId,
    };
    return raw as UserFamilyModel;
  }

  static toUserFamilyDTO(entity: UserFamily): UserFamilyResponseDTO {
    if (entity === null) {
      return null;
    }
    const { id, familyName, ownerId, owner, createdAt, updatedAt } = entity;
    return {
      id,
      familyName,
      ownerId,
      owner,
      createdAt,
      updatedAt,
    };
  }
}
