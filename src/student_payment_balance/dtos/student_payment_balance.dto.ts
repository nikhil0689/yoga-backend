import { ApiProperty } from '@nestjs/swagger';
import { Student } from 'src/student/student.entity';

export class StudentPaymentBalanceResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly student: Student;

  @ApiProperty()
  readonly balance: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
