import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsurancesController } from './insurances.controller';
import { InsurancesService } from './insurances.service';
import { Insurance } from './insurance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance])],
  controllers: [InsurancesController],
  providers: [InsurancesService],
  exports: [InsurancesService],
})
export class InsurancesModule {}
