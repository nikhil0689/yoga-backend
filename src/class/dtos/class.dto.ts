import { StudentFeeProps } from 'src/class_student/class_student.entity';
import { Student } from 'src/student/student.entity';
import { Class } from '../class.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StudentFeeDTO } from './class_student_fee.dto';

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
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly time: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    isArray: true,
    type: StudentFeeDTO,
  })
  readonly studentFee: StudentFeeDTO[];
}

export class ClassUpdateDTO {
  @IsOptional()
  @IsDateString()
  @ApiProperty()
  readonly date?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly time?: string;

  @IsOptional()
  @ApiProperty({
    isArray: true,
    type: StudentFeeDTO,
  })
  readonly studentFee?: StudentFeeDTO[];
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
