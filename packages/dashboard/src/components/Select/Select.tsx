import clsx from 'clsx';
import css from './Select.style.module.scss';

type TSelectItem = {
  name: string;
  value?: string;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  /**
   * Select oprtions
   */
  items: TSelectItem[];

  /**
   * Text color
   */
  color?: string;
};

export default function Select({
  items,
  color,
  className,
  ...rest
}: SelectProps): React.JSX.Element {
  const selectStyle = { color };

  return (
    <select
      className={clsx(css.container, className)}
      style={selectStyle}
      {...rest}
    >
      {items.map((item, index) => (
        <option key={`si-${index}`} value={item.value ?? item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
