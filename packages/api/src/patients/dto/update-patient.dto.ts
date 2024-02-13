import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dot';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
