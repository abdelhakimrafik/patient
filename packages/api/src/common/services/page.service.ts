import { FindOptionsWhere, Repository } from 'typeorm';
import { PageFilterDto } from '../dto/pageFilter.dto';
import { SortOrder } from '../enum/sortOrder.enum';
import { PageDto } from '../dto/page.dto';

export class PageService {
  protected createOrderQuery(filter: PageFilterDto) {
    const order: any = {};

    if (filter.orderBy) {
      order[filter.orderBy] = filter.sortOrder;
      return order;
    }

    order.createdAt = SortOrder.DESC;
    return order;
  }

  protected async paginate<T>(
    repository: Repository<T>,
    filter: PageFilterDto,
    where?: FindOptionsWhere<T>,
  ): Promise<PageDto<T>> {
    const [result, total] = await repository.findAndCount({
      order: this.createOrderQuery(filter),
      skip: (filter.page - 1) * filter.pageSize,
      take: filter.pageSize,
      where: where,
    });

    return new PageDto(filter.page, filter.pageSize, total, result);
  }
}
