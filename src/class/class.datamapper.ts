import {
  Class,
  ClassStudentProps,
  ClassStudentPropsWithCount,
  MonthlyClassProps,
  StudentNameFeeProps,
} from './class.entity';
import { ClassModel } from './class.model';
import {
  ClassResponseDTO,
  ClassStudentResponseDTO,
  PaginatedClassStudentResponseDTO,
  StudentFeeResponseDTO,
} from './dtos/class.dto';

enum Month {
  Jan = 1,
  Feb = 2,
  Mar = 3,
  Apr = 4,
  May = 5,
  Jun = 6,
  Jul = 7,
  Aug = 8,
  Sep = 9,
  Oct = 10,
  Nov = 11,
  Dec = 12,
}

export class ClassMap {
  static toDomain(model: ClassModel): Class {
    if (!model) {
      return null;
    }
    const { id, date, time, createdAt, updatedAt } = model;

    const projectedProps = {
      id,
      date,
      time,
      createdAt,
      updatedAt,
    };
    return Class.create(projectedProps);
  }

  static toClassStudentDomain(classes: ClassModel): ClassStudentProps {
    if (!classes) {
      return null;
    }

    const students = classes.classStudents.map((student) => ({
      studentId: student.studentId,
      fee: student.fee,
      studentName: student?.student?.name,
    }));

    const data: ClassStudentProps = {
      classId: classes.id,
      time: classes.time,
      date: classes.date,
      students: students,
    };

    return data;
  }

  static toMonthlyClassesInYearDomain(
    monthlyClasses: ClassModel[],
  ): MonthlyClassProps[] {
    if (!monthlyClasses) {
      return null;
    }

    const data = monthlyClasses.map((e) => ({
      year: e.get('year') as number,
      month: this.getMonthName(e.get('month') as number),
      classes: e.get('num_classes') as number,
    }));

    return data;
  }

  static getMonthName = (month: number): string => {
    return Month[month];
  };

  static toPersistence(entity: Class): ClassModel {
    const { date, time } = entity.props;
    const raw = {
      date,
      time,
    };
    return raw as ClassModel;
  }

  static toClassDTO(entity: Class): ClassResponseDTO {
    if (entity === null) {
      return null;
    }
    const { id, date, time, createdAt, updatedAt } = entity;
    return {
      id,
      date,
      time,
      createdAt,
      updatedAt,
    };
  }

  static toClassStudentDTO(entity: ClassStudentProps): ClassStudentResponseDTO {
    if (entity === null) {
      return null;
    }
    const { classId, date, time, students } = entity;

    const studentsDto = students.map((e) => this.toStudentFeeResponseDTO(e));

    return {
      classId,
      date,
      time,
      students: studentsDto,
    };
  }

  static toStudentFeeResponseDTO(
    student: StudentNameFeeProps,
  ): StudentFeeResponseDTO {
    if (student === null) {
      return null;
    }

    const { studentId, fee, studentName } = student;

    return {
      studentId,
      fee,
      studentName,
    };
  }

  static toPaginatedClassStudentCountDTO(
    entity: ClassStudentPropsWithCount,
  ): PaginatedClassStudentResponseDTO {
    if (entity === null) {
      return null;
    }
    const { results: data, count } = entity;

    const studentsDto = data.map((e) => this.toClassStudentDTO(e));

    return {
      results: studentsDto,
      count,
    };
  }
}
