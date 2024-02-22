import { Entity, proxyEntity } from 'entity';
import { User } from 'src/user/user.entity';

export interface StudentPaymentProps {
  readonly studentId: number;
  readonly student?: User;
  readonly payment: number;
  readonly date: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
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
