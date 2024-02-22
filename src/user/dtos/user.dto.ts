import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly isOwner: boolean;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

export class UserCreateDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly phone?: string;

  @ApiProperty()
  readonly email?: string;

  @ApiProperty()
  readonly address?: string;

  @ApiProperty()
  readonly family?: string;
}

export class UserUpdateDTO {
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly phone?: string;

  @ApiProperty()
  readonly email?: string;

  @ApiProperty()
  readonly address?: string;
}

export class GetUserDTO {
  @ApiProperty()
  readonly onlyOwners?: boolean;
}
