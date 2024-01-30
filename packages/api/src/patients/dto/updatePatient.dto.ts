import {
  IsString,
  IsEnum,
  IsPhoneNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../common/enum/gender.enum';

export class UpdatePatientDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public cardId: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public birthday: Date;

  @ApiProperty()
  @IsEnum(Gender)
  @IsOptional()
  public gender: Gender;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  public phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public additionalAddress: string;
}
