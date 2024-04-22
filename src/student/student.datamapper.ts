import {
  PaginatedStudentResponseDTO,
  StudentResponseDTO,
} from './dtos/student-response.dto';
import { Student, StudentPropsWithCount } from './student.entity';
import { StudentModel } from './student.model';
import { StudentFamilyMap } from 'src/student_family/student_family.datamapper';

export class StudentMap {
  static toDomain(model: StudentModel): Student {
    if (!model) {
      return null;
    }
    const {
      id,
      name,
      email,
      phone,
      address,
      familyId,
      family,
      createdAt,
      updatedAt,
    } = model;

    const familyData = StudentFamilyMap.toDomain(family);
    const projectedProps = {
      id,
      name,
      email,
      phone,
      familyId,
      family: familyData,
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
    const {
      id,
      name,
      email,
      phone,
      address,
      isOwner,
      familyId,
      family,
      createdAt,
      updatedAt,
    } = entity;
    return {
      id,
      name,
      email,
      phone,
      address,
      isOwner,
      familyId,
      family,
      createdAt,
      updatedAt,
    };
  }

  static toPaginatedStudentCountDTO(
    entity: StudentPropsWithCount,
  ): PaginatedStudentResponseDTO {
    if (entity === null) {
      return null;
    }
    const { results: data, count } = entity;

    const studentsDto = data.map((e) => this.toStudentDTO(e));

    return {
      results: studentsDto,
      count,
    };
  }
}
