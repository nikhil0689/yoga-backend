import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty()
  uniqueId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
