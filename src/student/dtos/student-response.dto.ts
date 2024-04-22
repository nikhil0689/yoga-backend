import { ApiProperty } from '@nestjs/swagger';
import { StudentFamily } from 'src/student_family/student_family.entity';

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
  readonly familyId: number;

  @ApiProperty()
  readonly family: StudentFamily;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

export class PaginatedStudentResponseDTO {
  @ApiProperty()
  readonly results: StudentResponseDTO[];

  @ApiProperty()
  readonly count: number;
}
