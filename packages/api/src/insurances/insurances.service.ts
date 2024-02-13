import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insurance } from './entities/insurance.entity';
import { CreateInsuranceDto } from './dto/create-insurance.dto';

@Injectable()
export class InsurancesService {
  constructor(
    @InjectRepository(Insurance)
    private readonly insuranceRepository: Repository<Insurance>,
  ) {}

  async findOne(id: string): Promise<Insurance | undefined> {
    return this.insuranceRepository.findOneBy({ id });
  }

  async findAll(): Promise<Insurance[]> {
    return await this.insuranceRepository.find();
  }

  async create(createInsuranceDto: CreateInsuranceDto): Promise<Insurance> {
    const createInsurance = this.insuranceRepository.create(createInsuranceDto);
    return await this.insuranceRepository.save(createInsurance);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.insuranceRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
