import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class StudentFeeDTO {
  @IsNumber()
  @ApiProperty()
  fee: number;

  @IsNumber()
  @ApiProperty()
  studentId: number;
}
