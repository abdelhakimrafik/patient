import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { PageFilterDto } from 'src/common/dto/pageFilter.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/common/services/page.service';
import { CreateDocumentDto } from './dto/createDocument.dto';
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
}
