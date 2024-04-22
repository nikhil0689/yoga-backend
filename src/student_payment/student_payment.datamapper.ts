import {
  StudentPayment,
  StudentPaymentsWithCount,
} from './student_payment.entity';
import { StudentPaymentModel } from './student_payment.model';
import { StudentMap } from 'src/student/student.datamapper';
import {
  PaginatedStudentPaymentResponseDTO,
  StudentPaymentResponseDTO,
} from './dtos/student_payment.dto';

export class StudentPaymentMap {
  static toDomain(model: StudentPaymentModel): StudentPayment {
    if (!model) {
      return null;
    }
    const { id, studentId, student, payment, date, createdAt, updatedAt } =
      model;

    let studentData = null;
    if (student) {
      studentData = StudentMap.toDomain(student);
    }
    const projectedProps = {
      id,
      studentId,
      student: studentData,
      payment,
      date,
      createdAt,
      updatedAt,
    };
    return StudentPayment.create(projectedProps);
  }

  static toPersistence(entity: StudentPayment): StudentPaymentModel {
    const { studentId, payment, date } = entity.props;
    const raw = {
      studentId,
      date,
      payment,
    };
    return raw as StudentPaymentModel;
  }

  static toStudentPaymentDTO(
    entity: StudentPayment,
  ): StudentPaymentResponseDTO {
    if (entity === null) {
      return null;
    }
    const { id, student, date, payment, createdAt, updatedAt } = entity;

    return {
      id,
      student,
      date,
      payment,
      createdAt,
      updatedAt,
    };
  }

  static toPaginatedStudentPaymentDTO(
    entity: StudentPaymentsWithCount,
  ): PaginatedStudentPaymentResponseDTO {
    if (entity === null) {
      return null;
    }
    const { results: data, count } = entity;

    const studentsPaymentDto = data.map((e) => this.toStudentPaymentDTO(e));

    return {
      results: studentsPaymentDto,
      count,
    };
  }
}
