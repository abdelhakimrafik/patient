import clsx from 'clsx';
import Icon, { TIconName } from '../Icon';
import css from './Input.style.module.scss';
import { useState } from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Input type, wheter is a normal text input, email or password
   */
  type?: 'text' | 'numeric' | 'tel' | 'password' | 'email' | 'url';

  /**
   * Label text to use for input
   */
  label?: string;

  /**
   * Label text style
   */
  labelStyle?: React.StyleHTMLAttributes<HTMLLabelElement>;

  /**
   * Icon to use for the left side of the input
   */
  iconLeft?: TIconName;

  /**
   * Icon to use for the right side of the input
   */
  iconRight?: TIconName;

  onIconLeftClick?: () => void;

  onIconRightClick?: () => void;

  /**
   * Input error message
   */
  error?: string;
};

export default function Input({
  type = 'text',
  label,
  labelStyle,
  iconLeft,
  iconRight,
  onIconLeftClick,
  onIconRightClick,
  error,
  disabled,
  required,
  ...rest
}: InputProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={css.container}>
      <label className={clsx(css.label, labelStyle)}>
        {label}
        {required ? <span className={css.required}>*</span> : null}
      </label>
      <div className={clsx(css.wrapper, isFocused && css.focused)}>
        {iconLeft ? (
          <Icon
            name={iconLeft}
            onClick={onIconLeftClick}
            className={clsx(onIconLeftClick && css.clicable)}
          />
        ) : null}
        <input
          type={type}
          disabled={disabled}
          required={required}
          className={css.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {iconRight ? (
          <Icon
            name={iconRight}
            onClick={onIconRightClick}
            className={clsx(onIconRightClick && css.clicable)}
          />
        ) : null}
      </div>
      {error ? <div className={css.error}>{error}</div> : null}
    </div>
  );
}
