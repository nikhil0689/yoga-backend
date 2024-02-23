import { StudentResponseDTO } from './dtos/student.dto';
import { Student } from './student.entity';
import { StudentModel } from './student.model';

export class StudentMap {
  static toDomain(model: StudentModel): Student {
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
    return Student.create(projectedProps);
  }

  static toPersistence(entity: Student): StudentModel {
    const { name, email, phone, address, familyId } = entity.props;
    const raw = {
      name,
      email,
      phone,
      address,
      familyId,
    };
    return raw as StudentModel;
  }

  static toStudentDTO(entity: Student): StudentResponseDTO {
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
