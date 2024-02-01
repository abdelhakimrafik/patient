import clsx from 'clsx';
import css from './Select.style.module.scss';

export type TSelectItem = {
  name: string;
  value?: string;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  /**
   * Select oprtions
   */
  items: TSelectItem[];

  /**
   * Label text to use for input
   */
  label?: string;

  /**
   * Label text style
   */
  labelStyle?: React.StyleHTMLAttributes<HTMLLabelElement>;

  /**
   * Text color
   */
  color?: string;

  /**
   * Input error message
   */
  error?: string;
};

export default function Select({
  items,
  label,
  labelStyle,
  color,
  error,
  required,
  className,
  ...rest
}: SelectProps): React.JSX.Element {
  const selectStyle = { color };

  return (
    <div>
      {label ? (
        <label className={clsx(css.label, labelStyle)}>
          {label}
          {required ? <span className={css.required}>*</span> : null}
        </label>
      ) : null}
      <select
        className={clsx(css.select, className)}
        style={selectStyle}
        required={required}
        {...rest}
      >
        {items.map((item, index) => (
          <option key={`si-${index}`} value={item.value ?? item.name}>
            {item.name}
          </option>
        ))}
      </select>
      {error ? <div className={css.error}>{error}</div> : null}
    </div>
  );
}
