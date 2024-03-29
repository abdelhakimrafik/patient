import clsx from 'clsx';
import Icon, { TIconName } from '../Icon';
import css from './Button.style.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Wether the button should take the available parent width
   */
  full?: boolean;

  /**
   * Wether the button border is rounded or like circle
   */
  borderType?: 'default' | 'rounded' | 'circle';

  /**
   * Text to use for button
   */
  text?: string;

  /**
   * Size of the button text
   */
  size?: string | number;

  /**
   * Button text color
   */
  color?: string;

  /**
   * Background color to use for button
   */
  backgroundColor?: string;

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
};

const borderTypes = {
  default: 3,
  rounded: 10,
  circle: 45,
};

export default function Button({
  full,
  borderType,
  text,
  size,
  color,
  backgroundColor,
  iconLeft,
  iconRight,
  disabled,
  className,
  onClick,
  children,
  style,
  ...rest
}: ButtonProps): React.JSX.Element {
  const borderRadius = borderType
    ? borderTypes[borderType]
    : borderTypes.default;
  const containerStyle = {
    backgroundColor,
    color,
    fontSize: size,
    borderRadius,
    ...style,
  };

  return (
    <button
      style={containerStyle}
      className={clsx(
        css.container,
        full && css.full,
        disabled && css.disabled,
        className,
      )}
      onClick={!disabled ? onClick : undefined}
      {...rest}
    >
      {iconLeft ? <Icon name={iconLeft} /> : null}
      {text ?? children}
      {iconRight ? <Icon name={iconRight} /> : null}
    </button>
  );
}
