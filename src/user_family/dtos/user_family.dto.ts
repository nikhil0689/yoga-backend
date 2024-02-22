import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class UserFamilyResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly familyName: string;

  @ApiProperty()
  readonly ownerId: number;

  @ApiProperty()
  readonly owner?: User;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
