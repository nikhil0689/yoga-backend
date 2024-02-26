import { Entity, proxyEntity } from 'entity';
import { Student } from 'src/student/student.entity';

export interface StudentFamilyProps {
  readonly familyName: string;
  readonly ownerId: number;
  readonly owner?: Student;
  readonly balance: number;
}

export class StudentFamily extends Entity<StudentFamilyProps> {
  private constructor(props: StudentFamilyProps) {
    super(props);
  }
  static create(props: StudentFamilyProps): StudentFamily {
    return proxyEntity(new StudentFamily(props));
  }
}
