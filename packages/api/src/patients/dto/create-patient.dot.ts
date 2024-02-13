import {
  IsString,
  IsEnum,
  IsPhoneNumber,
  IsDate,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../common/enums/gender.enum';

export class CreatePatientDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({ example: 'PA248657' })
  @IsString()
  @IsNotEmpty()
  public cardId: string;

  @ApiProperty({ example: '1994/08/21' })
  @IsDate()
  public birthday: Date;

  @ApiProperty({ enum: Gender, example: Gender.Male })
  @IsEnum(Gender)
  public gender: Gender;

  @ApiProperty({ example: '+212678954867' })
  @IsPhoneNumber()
  public phone: string;

  @ApiProperty({ example: 'Oulfa, Casablanca' })
  @IsString()
  public address: string;

  @ApiProperty()
  @IsString()
  public additionalAddress: string;

  @ApiProperty()
  @IsUUID()
  public insurance: string;
}
