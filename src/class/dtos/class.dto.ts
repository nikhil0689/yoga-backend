import { StudentFeeProps } from 'src/class_student/class_student.entity';
import { Student } from 'src/student/student.entity';
import { Class } from '../class.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ClassResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly time: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

export class ClassCreateDTO {
  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly time: string;

  @ApiProperty()
  readonly studentFee: StudentFeeProps[];
}

export class ClassUpdateDTO {
  @ApiProperty()
  readonly date?: string;

  @ApiProperty()
  readonly time?: string;

  @ApiProperty()
  readonly studentFee?: StudentFeeProps[];
}

export class ClassStudentResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly student: Student;

  @ApiProperty()
  readonly _class: Class;

  @ApiProperty()
  readonly fee: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
