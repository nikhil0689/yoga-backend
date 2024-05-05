import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class StudentCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly phone?: string;

  @IsOptional()
  @ApiProperty()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly address?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly familyId?: number;
}

export class StudentUpdateDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly phone?: string;

  @IsOptional()
  @ApiProperty()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly address?: string;
}

export class GetStudentDTO {
  @ApiProperty()
  readonly onlyOwners?: boolean;
}
