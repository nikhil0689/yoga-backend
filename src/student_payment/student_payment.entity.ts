import { Entity, proxyEntity } from 'entity';
import { Student } from 'src/student/student.entity';

export interface StudentPaymentProps {
  readonly studentId: number;
  readonly student?: Student;
  readonly payment: number;
  readonly date: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface StudentPaymentsWithCount {
  readonly results: StudentPayment[];
  readonly count: number;
}

export interface AddStudentPaymentProps {
  readonly studentId: number;
  readonly date: string;
  readonly payment: number;
}

export interface UpdateStudentPaymentProps {
  readonly studentId?: number;
  readonly date?: string;
  readonly payment?: number;
}

export class StudentPayment extends Entity<StudentPaymentProps> {
  private constructor(props: StudentPaymentProps) {
    super(props);
  }
  static create(props: StudentPaymentProps): StudentPayment {
    return proxyEntity(new StudentPayment(props));
  }
}
