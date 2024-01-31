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
  borderType?: 'rounded' | 'circle';

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
  default: 5,
  rounded: 15,
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
  };

  return (
    <button
      className={clsx(css.container, full && css.full, className)}
      style={containerStyle}
      onClick={!disabled ? onClick : undefined}
      {...rest}
    >
      {iconLeft ? <Icon name={iconLeft} /> : null}
      {text ?? children}
      {iconRight ? <Icon name={iconRight} /> : null}
    </button>
  );
}
