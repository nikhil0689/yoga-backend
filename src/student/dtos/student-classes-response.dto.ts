import { ApiProperty } from '@nestjs/swagger';
import { Class } from 'src/class/class.entity';
import { Student } from '../student.entity';

export class StudentClassesResponseDTO {
  @ApiProperty()
  readonly classId: number;

  @ApiProperty()
  readonly _class: Class;

  @ApiProperty()
  readonly student: Student;

  @ApiProperty()
  readonly fee: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

export class PaginatedStudentClassesResponseDTO {
  @ApiProperty()
  readonly results: StudentClassesResponseDTO[];

  @ApiProperty()
  readonly count: number;
}
