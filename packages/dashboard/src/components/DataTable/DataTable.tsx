import clsx from 'clsx';
import Button from '../Button';
import css from './DataTable.style.module.scss';

type TPagination = {
  page: number;
  totalPage: number;
};

export type TColumns<T> = {
  name: string;
  key: string;
  transform?: (item: T) => string;
};

export type DataTableProps<T> = React.TableHTMLAttributes<HTMLTableElement> & {
  values: T[];
  columns?: TColumns<T>[];
  pagination?: TPagination;
  emptyMessage?: string;
  renderItem?: (item: T, columns: TColumns<T>[]) => React.JSX.Element[];
  onPageChange?: (page: number) => void;
  onRowClick?: (item: T) => void;
};

export default function DataTable<T extends object>({
  values,
  columns: userColumns,
  pagination,
  emptyMessage,
  className,
  renderItem = defaultRenderItem,
  onPageChange,
  onRowClick,
}: DataTableProps<T>): React.JSX.Element {
  const columns =
    userColumns ??
    Object.keys(values[0]).map((name) => ({
      name,
      key: name,
    }));

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <table className={clsx(css.table, className)}>
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th key={`dth-${index}`}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((item, index) => (
              <tr
                key={`dttr-${index}`}
                onClick={() => onRowClick?.(item)}
                className={clsx(onRowClick && css.clicableRow)}
              >
                {renderItem(item, columns)}
              </tr>
            ))}
          </tbody>
        </table>
        {!values.length ? (
          <div className={css.noData}>{emptyMessage ?? 'No data'}</div>
        ) : null}
      </div>
      {pagination && pagination.totalPage ? (
        <div className={css.paginationWrapper}>
          {Array.from(Array(pagination.totalPage)).map((_, index) => {
            const isActive = pagination.page - 1 === index;
            return (
              <span
                key={`dtpi-${index}`}
                className={clsx(isActive && css.active)}
                onClick={() => !isActive && onPageChange?.(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          <Button
            backgroundColor="#50799E"
            iconLeft="ChevronRight"
            className={css.navigationBtn}
            disabled={pagination.page === pagination.totalPage}
            onClick={() => onPageChange?.(pagination.page + 1)}
          />
        </div>
      ) : null}
    </div>
  );
}

function defaultRenderItem(item: object, columns: TColumns<object>[]) {
  return columns.map((column, index) => {
    const value =
      column.transform?.(item) ??
      (item as unknown as Record<string, string>)[column.key];
    return <td key={`dttd-${index}`}>{value}</td>;
  });
}
