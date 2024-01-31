import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InsurancesService } from './insurances.service';
import { CreateInsuranceDto } from './dto/createInsurance.dto';

@ApiBearerAuth('access-token')
@Controller('insurances')
export class InsurancesController {
  constructor(private readonly insurancesService: InsurancesService) {}

  @Get()
  findAll() {
    return this.insurancesService.findAll();
  }

  @Post()
  create(@Body() createInsuranceDto: CreateInsuranceDto) {
    return this.insurancesService.create(createInsuranceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.insurancesService.delete(id);
  }
}
