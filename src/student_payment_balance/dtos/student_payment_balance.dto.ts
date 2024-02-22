import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class StudentPaymentBalanceResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly student: User;

  @ApiProperty()
  readonly balance: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
