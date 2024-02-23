import { Entity, proxyEntity } from 'entity';
import { Student } from 'src/student/student.entity';

export interface StudentPaymentBalanceProps {
  readonly studentId: number;
  readonly student?: Student;
  readonly balance: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface AddStudentPaymentBalanceProps {
  readonly studentId: number;
  readonly balance: number;
}

export class StudentPaymentBalance extends Entity<StudentPaymentBalanceProps> {
  private constructor(props: StudentPaymentBalanceProps) {
    super(props);
  }
  static create(props: StudentPaymentBalanceProps): StudentPaymentBalance {
    return proxyEntity(new StudentPaymentBalance(props));
  }
}
