import {
  MonthlyPaymentProps,
  StudentPayment,
  StudentPaymentsWithCount,
} from './student_payment.entity';
import { StudentPaymentModel } from './student_payment.model';
import { StudentMap } from 'src/student/student.datamapper';
import {
  PaginatedStudentPaymentResponseDTO,
  StudentPaymentResponseDTO,
} from './dtos/student_payment.dto';

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

  static toMonthlyPaymentsInYearDomain(
    monthlyPayments: StudentPaymentModel[],
  ): MonthlyPaymentProps[] {
    if (!monthlyPayments) {
      return null;
    }

    const data = monthlyPayments.map((e) => ({
      year: e.get('year') as number,
      month: this.getMonthName(e.get('month') as number),
      payments: e.get('payments') as number,
    }));

    return data;
  }

  static getMonthName = (month: number): string => {
    return Month[month];
  };

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
