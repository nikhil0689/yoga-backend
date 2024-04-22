import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
  readonly classId: number;

  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly time: string;

  @ApiProperty()
  readonly students: StudentFeeResponseDTO[];
}

export class StudentFeeResponseDTO {
  @ApiProperty()
  readonly studentId: number;

  @ApiProperty()
  readonly fee: number;

  @ApiProperty()
  readonly studentName: string;
}

export class PaginatedClassStudentResponseDTO {
  @ApiProperty()
  readonly results: ClassStudentResponseDTO[];

  @ApiProperty()
  readonly count: number;
}
