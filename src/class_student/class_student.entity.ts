import { Entity, proxyEntity } from 'entity';
import { Class } from 'src/class/class.entity';
import { Student } from 'src/student/student.entity';

export interface ClassStudentProps {
  readonly classId: number;
  readonly _class?: Class;
  readonly studentId: number;
  readonly student?: Student;
  readonly fee: number;
}

export interface StudentFeeProps {
  readonly studentId: number;
  readonly fee: number;
}

export class ClassStudent extends Entity<ClassStudentProps> {
  private constructor(props: ClassStudentProps) {
    super(props);
  }
  static create(props: ClassStudentProps): ClassStudent {
    return proxyEntity(new ClassStudent(props));
  }
}
