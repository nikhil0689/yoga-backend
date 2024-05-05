import { Entity, proxyEntity } from 'entity';
import { StudentFeeProps } from 'src/class_student/class_student.entity';

export interface ClassProps {
  readonly date: string;
  readonly time: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface ClassStudentProps {
  readonly classId: number;
  readonly date: string;
  readonly time: string;
  readonly students: StudentNameFeeProps[];
}

export interface MonthlyClassProps {
  readonly year: number;
  readonly month: string;
  readonly classes: number;
}

export interface ClassStudentPropsWithCount {
  readonly results: ClassStudentProps[];
  readonly count: number;
}

export interface StudentNameFeeProps {
  studentId: number;
  fee: number;
  studentName: string;
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
