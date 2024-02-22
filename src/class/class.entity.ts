import { Entity, proxyEntity } from 'entity';
import { StudentFeeProps } from 'src/class_student/class_student.entity';
import { User } from 'src/user/user.entity';

export interface ClassProps {
  readonly date: string;
  readonly time: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateClassProps {
  readonly date: string;
  readonly time: string;
  readonly studentFee: StudentFeeProps[];
}

export interface UpdateClassProps {
  readonly date?: string;
  readonly time?: string;
  readonly studentFee?: StudentFeeProps[];
}

export class Class extends Entity<ClassProps> {
  private constructor(props: ClassProps) {
    super(props);
  }
  static create(props: ClassProps): Class {
    return proxyEntity(new Class(props));
  }
}
