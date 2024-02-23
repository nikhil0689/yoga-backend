import { ApiProperty } from '@nestjs/swagger';
import { Student } from 'src/student/student.entity';

export class StudentFamilyResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly familyName: string;

  @ApiProperty()
  readonly ownerId: number;

  @ApiProperty()
  readonly owner?: Student;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
