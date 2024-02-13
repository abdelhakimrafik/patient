import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { PageService } from 'src/common/services/page.service';
import { PageFilterDto } from 'src/common/dto/page-filter.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class DocumentsService extends PageService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly patientsService: PatientsService,
  ) {
    super();
  }

  async findOne(id: string): Promise<Document | undefined> {
    return await this.documentRepository.findOneBy({ id });
  }

  async findAll(pageFilter: PageFilterDto): Promise<PageDto<Document>> {
    return await this.paginate(this.documentRepository, {
      filter: pageFilter,
      relations: { patient: { insurance: true } },
      where: this.createWhereQuery(pageFilter),
    });
  }

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const createPatient = await this.patientsService.create(
      createDocumentDto.patient,
    );
    const createInsurance = this.documentRepository.create({
      patient: createPatient,
    });
    return await this.documentRepository.save(createInsurance);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.documentRepository.delete(id);
    return deleteResult.affected > 0;
  }

  private createWhereQuery(params: PageFilterDto) {
    let where: any;

    if (params.keyword) {
      where = [
        {
          patient: { firstName: ILike(`%${params.keyword}%`) },
        },
        {
          patient: { lastName: ILike(`%${params.keyword}%`) },
        },
        {
          patient: { cardId: ILike(`%${params.keyword}%`) },
        },
      ];
    }

    return where;
  }
}
