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

  /**
   * Icon left click handler
   */
  onIconLeftClick?: () => void;

  /**
   * Icon rigth click handler
   */
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
  iconRight: userIconRight,
  onIconLeftClick,
  onIconRightClick,
  error,
  disabled,
  required,
  className,
  ...rest
}: InputProps): React.JSX.Element {
  const isPasswordInput = type === 'password';
  const [isSecure, setIsSecure] = useState<boolean>(isPasswordInput);
  const iconRight: TIconName | undefined = isPasswordInput
    ? 'Eye'
    : userIconRight;

  const handleIconRightClick = () => {
    if (isPasswordInput) {
      setIsSecure((state) => !state);
    }
    onIconRightClick?.();
  };

  return (
    <>
      {label ? (
        <label className={clsx(css.label, labelStyle)}>
          {label}
          {required ? <span className={css.required}>*</span> : null}
        </label>
      ) : null}
      <div className={clsx(css.wrapper, error && css.errorBorder, className)}>
        {iconLeft ? (
          <Icon
            name={iconLeft}
            onClick={onIconLeftClick}
            className={clsx(onIconLeftClick && css.clicable)}
          />
        ) : null}
        <input
          type={isPasswordInput ? (isSecure ? 'password' : 'text') : type}
          disabled={disabled}
          required={required}
          className={css.input}
          {...rest}
        />
        {iconRight ? (
          <Icon
            name={iconRight}
            onClick={handleIconRightClick}
            className={clsx(onIconRightClick && css.clicable)}
          />
        ) : null}
      </div>
      {error ? <div className={css.error}>{error}</div> : null}
    </>
  );
}
