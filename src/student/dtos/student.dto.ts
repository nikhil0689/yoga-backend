import { ApiProperty } from '@nestjs/swagger';

export class StudentResponseDTO {
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

export class StudentCreateDTO {
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

export class StudentUpdateDTO {
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly phone?: string;

  @ApiProperty()
  readonly email?: string;

  @ApiProperty()
  readonly address?: string;
}

export class GetStudentDTO {
  @ApiProperty()
  readonly onlyOwners?: boolean;
}
