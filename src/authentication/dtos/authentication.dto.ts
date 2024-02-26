import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
