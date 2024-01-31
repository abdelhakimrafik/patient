import { ForwardedRef, forwardRef, useState } from 'react';
import clsx from 'clsx';
import Icon, { TIconName } from '../Icon';
import css from './Input.style.module.scss';

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
  labelStyle?: React.CSSProperties;

  /**
   * Style for the container
   */
  containerStyle?: React.CSSProperties;

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

function Input(
  {
    type = 'text',
    label,
    labelStyle,
    containerStyle,
    iconLeft,
    iconRight: userIconRight,
    onIconLeftClick,
    onIconRightClick,
    error,
    disabled,
    required,
    className,
    style,
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
): React.JSX.Element {
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
    <div style={containerStyle}>
      {label ? (
        <label className={clsx(css.label, labelStyle)}>
          {label}
          {required ? <span className={css.required}>*</span> : null}
        </label>
      ) : null}
      <div
        className={clsx(css.wrapper, error && css.errorBorder, className)}
        style={style}
      >
        {iconLeft ? (
          <Icon
            name={iconLeft}
            onClick={onIconLeftClick}
            className={clsx(onIconLeftClick && css.clicable)}
          />
        ) : null}
        <input
          ref={ref}
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
    </div>
  );
}

const InputForwared = forwardRef(Input);
export default InputForwared;
