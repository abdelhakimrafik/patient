import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
