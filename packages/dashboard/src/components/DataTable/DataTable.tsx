import clsx from 'clsx';
import css from './DataTable.style.module.scss';
import Button from '../Button';

type TPagination = {
  page: number;
  total: number;
};

export type DataTableProps<T> = React.TableHTMLAttributes<HTMLTableElement> & {
  values: T[];
  columns?: string[];
  pagination?: TPagination;
  renderItem?: (item: T) => React.JSX.Element[];
  onPageChange?: (page: number) => void;
};

export default function DataTable<T extends Record<string, string>>({
  values,
  columns: userColumns,
  pagination,
  className,
  renderItem = defaultRenderItem,
  onPageChange,
}: DataTableProps<T>): React.JSX.Element {
  const columns = userColumns ?? Object.keys(values[0]);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <table className={clsx(css.table, className)}>
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th key={`dth-${index}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((item, index) => (
              <tr key={`dttr-${index}`}>{renderItem(item)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination ? (
        <div className={css.paginationWrapper}>
          {Array.from(Array(pagination.total)).map((_, index) => (
            <span
              key={`dtpi-${index}`}
              className={clsx(pagination.page - 1 === index && css.active)}
              onClick={() => onPageChange?.(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          {pagination.page !== pagination.total ? (
            <Button
              backgroundColor="#50799E"
              iconLeft="ChevronRight"
              className={css.navigationBtn}
              onClick={() => onPageChange?.(pagination.page + 1)}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function defaultRenderItem(item: Record<string, string>) {
  const values = Object.values(item);

  return values.map((value, index) => <td key={`dttd-${index}`}>{value}</td>);
}
