import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class StudentCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('US')
  @ApiProperty()
  readonly phone?: string;

  @IsOptional()
  @IsEmail()
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
  @IsEmail()
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
