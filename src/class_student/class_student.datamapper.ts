import { ClassMap } from 'src/class/class.datamapper';
import { ClassStudent } from './class_student.entity';
import { ClassStudentModel } from './class_student.model';
import { StudentMap } from 'src/student/student.datamapper';

export class ClassStudentMap {
  static toDomain(model: ClassStudentModel): ClassStudent {
    if (!model) {
      return null;
    }
    const {
      id,
      classId,
      _class,
      studentId,
      student,
      fee,
      createdAt,
      updatedAt,
    } = model;

    let classData = null;
    if (_class) {
      classData = ClassMap.toDomain(_class);
    }
    let studentData = null;
    if (student) {
      studentData = StudentMap.toDomain(student);
    }
    const projectedProps = {
      id,
      classId,
      _class: classData,
      studentId,
      student: studentData,
      fee,
      createdAt,
      updatedAt,
    };
    return ClassStudent.create(projectedProps);
  }

  static toPersistence(entity: ClassStudent): ClassStudentModel {
    const { classId, studentId, fee } = entity.props;
    const raw = {
      classId,
      studentId,
      fee,
    };
    return raw as ClassStudentModel;
  }

  // static toClassStudentDTO(entity: ClassStudent): ClassStudentResponseDTO {
  //   if (entity === null) {
  //     return null;
  //   }
  //   const { id, _class, student, fee, createdAt, updatedAt } = entity;
  //   return {
  //     id,
  //     _class,
  //     student,
  //     fee,
  //     createdAt,
  //     updatedAt,
  //   };
  // }
}
