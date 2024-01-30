import {
  IsString,
  IsEnum,
  IsPhoneNumber,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../common/enum/gender.enum';

export class CreatePatientDto {
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
  public cardId: string;

  @ApiProperty()
  @IsDate()
  public birthday: Date;

  @ApiProperty()
  @IsEnum(Gender)
  public gender: Gender;

  @ApiProperty()
  @IsPhoneNumber()
  public phone: string;

  @ApiProperty()
  @IsString()
  public address: string;

  @ApiProperty()
  @IsString()
  public additionalAddress: string;
}
