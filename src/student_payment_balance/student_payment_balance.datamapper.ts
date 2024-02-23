import { StudentMap } from 'src/student/student.datamapper';
import { StudentPaymentBalance } from './student_payment_balance.entity';
import { StudentPaymentBalanceModel } from './student_payment_balance.model';
import { StudentPaymentBalanceResponseDTO } from './dtos/student_payment_balance.dto';

export class StudentPaymentBalanceMap {
  static toDomain(model: StudentPaymentBalanceModel): StudentPaymentBalance {
    if (!model) {
      return null;
    }
    const { id, studentId, student, balance, createdAt, updatedAt } = model;

    let studentData = null;
    if (student) {
      studentData = StudentMap.toDomain(student);
    }
    const projectedProps = {
      id,
      studentId,
      student: studentData,
      balance,
      createdAt,
      updatedAt,
    };
    return StudentPaymentBalance.create(projectedProps);
  }

  static toPersistence(
    entity: StudentPaymentBalance,
  ): StudentPaymentBalanceModel {
    const { studentId, balance } = entity.props;
    const raw = {
      studentId,
      balance,
    };
    return raw as StudentPaymentBalanceModel;
  }

  static toStudentPaymentBalanceDTO(
    entity: StudentPaymentBalance,
  ): StudentPaymentBalanceResponseDTO {
    if (entity === null) {
      return null;
    }
    const { id, studentId, student, balance, createdAt, updatedAt } = entity;

    return {
      id,
      student,
      balance,
      createdAt,
      updatedAt,
    };
  }
}
