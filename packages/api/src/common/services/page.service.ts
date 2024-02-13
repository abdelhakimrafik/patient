import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { PageFilterDto } from '../dto/page-filter.dto';
import { SortOrder } from '../enums/sort-order.enum';
import { PageDto } from '../dto/page.dto';

type PaginateParams<T> = {
  filter: PageFilterDto;
  select?: FindOptionsSelect<T>;
  relations?: FindOptionsRelations<T>;
  where?: FindOptionsWhere<T>;
};

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
    params: PaginateParams<T>,
  ): Promise<PageDto<T>> {
    const { select, filter, relations, where } = params;
    const [result, total] = await repository.findAndCount({
      select: select,
      order: this.createOrderQuery(filter),
      skip: (filter.page - 1) * filter.pageSize,
      take: filter.pageSize,
      relations,
      where: where,
    });

    return new PageDto(filter.page, filter.pageSize, total, result);
  }
}
