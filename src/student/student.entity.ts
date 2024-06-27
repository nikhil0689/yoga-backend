import { Entity, proxyEntity } from 'entity';
import { StudentFamily } from 'src/student_family/student_family.entity';

export interface StudentProps {
  readonly name: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
  readonly familyId?: number;
  readonly family?: StudentFamily;
  readonly classCount?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface StudentPropsWithCount {
  readonly results: Student[];
  readonly count: number;
}

export interface CreateStudentProps {
  readonly name: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
  readonly familyId?: number;
}

export interface UpdateStudentProps {
  readonly name?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
  readonly familyId?: number;
}

export class Student extends Entity<StudentProps> {
  private constructor(props: StudentProps) {
    super(props);
  }
  static create(props: StudentProps): Student {
    return proxyEntity(new Student(props));
  }
}
