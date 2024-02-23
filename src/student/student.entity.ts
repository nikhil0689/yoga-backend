import { Entity, proxyEntity } from 'entity';

export interface StudentProps {
  readonly name: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
  readonly familyId?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateStudentProps {
  readonly name: string;
  readonly phone?: string;
  readonly email?: string;
  readonly address?: string;
  readonly family?: string;
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
