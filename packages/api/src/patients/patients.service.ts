import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { UpdatePatientDto } from './dto/updatePatient.dto';
import { CreatePatientDto } from './dto/createPatient.dot';
import { PageFilterDto } from 'src/common/dto/pageFilter.dto';
import { PageService } from 'src/common/services/page.service';
import { PageDto } from 'src/common/dto/page.dto';
import { InsurancesService } from 'src/insurances/insurances.service';

@Injectable()
export class PatientsService extends PageService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly insurancesService: InsurancesService,
  ) {
    super();
  }

  async findOne(id: string): Promise<Patient | undefined> {
    return await this.patientRepository.findOne({
      where: { id },
      relations: { insurance: true },
    });
  }

  async findAll(pageFilter: PageFilterDto): Promise<PageDto<Patient>> {
    return await this.paginate(this.patientRepository, {
      filter: pageFilter,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        birthday: true,
        gender: true,
        cardId: true,
        createdAt: true,
        updatedAt: true,
      },
      where: this.createWhereQuery(pageFilter),
    });
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { insurance: insuranceId, ...patientData } = createPatientDto;
    const insurance = await this.insurancesService.findOne(insuranceId);
    const createPatient = this.patientRepository.create({
      insurance: insurance,
      ...patientData,
    });
    return await this.patientRepository.save(createPatient);
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const updatePatient = await this.patientRepository.findOneBy({ id });
    this.patientRepository.merge(updatePatient, updatePatientDto);
    return await this.patientRepository.save(updatePatient);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.patientRepository.delete(id);
    return deleteResult.affected > 0;
  }

  private createWhereQuery(params: PageFilterDto) {
    let where: any;

    if (params.keyword) {
      where = [
        {
          firstName: ILike(`%${params.keyword}%`),
        },
        {
          lastName: ILike(`%${params.keyword}%`),
        },
        {
          cardId: ILike(`%${params.keyword}%`),
        },
      ];
    }

    return where;
  }
}
