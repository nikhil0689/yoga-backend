import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class StudentPaymentResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly student: User;

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
  @ApiProperty()
  readonly studentId: number;

  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly payment: number;
}

export class UpdateStudentPaymentDTO {
  @ApiProperty()
  readonly studentId?: number;

  @ApiProperty()
  readonly date?: string;

  @ApiProperty()
  readonly payment?: number;
}
