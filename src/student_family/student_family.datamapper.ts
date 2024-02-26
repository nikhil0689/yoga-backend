import { StudentMap } from 'src/student/student.datamapper';
import { StudentFamilyResponseDTO } from './dtos/student_family.dto';
import { StudentFamily } from './student_family.entity';
import { StudentFamilyModel } from './student_family.model';

export class StudentFamilyMap {
  static toDomain(model: StudentFamilyModel): StudentFamily {
    if (!model) {
      return null;
    }
    const { id, familyName, ownerId, owner, balance, createdAt, updatedAt } =
      model;
    let ownerDetails = null;
    if (owner) {
      ownerDetails = StudentMap.toDomain(owner);
    }
    const projectedProps = {
      id,
      familyName,
      ownerId,
      owner: ownerDetails,
      balance,
      createdAt,
      updatedAt,
    };
    return StudentFamily.create(projectedProps);
  }

  static toPersistence(entity: StudentFamily): StudentFamilyModel {
    const { familyName, ownerId, balance } = entity.props;
    const raw = {
      familyName,
      ownerId,
      balance,
    };
    return raw as StudentFamilyModel;
  }

  static toStudentFamilyDTO(entity: StudentFamily): StudentFamilyResponseDTO {
    if (entity === null) {
      return null;
    }
    const { id, familyName, ownerId, owner, balance, createdAt, updatedAt } =
      entity;
    return {
      id,
      familyName,
      ownerId,
      owner,
      balance,
      createdAt,
      updatedAt,
    };
  }
}
