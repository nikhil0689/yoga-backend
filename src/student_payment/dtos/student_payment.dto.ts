import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Student } from 'src/student/student.entity';

export class StudentPaymentResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly student: Student;

  @ApiProperty()
  readonly payment: number;

  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

export class CreatePaymentDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly studentId: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  readonly date: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly payment: number;
}

export class UpdateStudentPaymentDTO {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly studentId?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  readonly date?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly payment?: number;
}
