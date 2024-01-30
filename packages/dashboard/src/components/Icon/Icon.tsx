import { IconSet } from './IconSet';
import css from './Icon.style.module.scss';
import clsx from 'clsx';

export type TIconName = keyof typeof IconSet;

export type IconProps = {
  /**
   * Name of the icon to use defined in IconSet
   */
  name: TIconName;

  /**
   * Icon color
   */
  color?: string;

  /**
   * Icon size
   */
  size?: string | number;

  /**
   * Icon classname style
   */
  className?: string;

  onClick?: () => void;
};

export default function Icon({
  name,
  color,
  size,
  className,
  onClick,
}: IconProps): React.JSX.Element {
  const iconStyle = {
    color,
    fontSize: size,
  };

  return (
    <i
      className={clsx(css.ico, css[IconSet[name]], className)}
      onClick={onClick}
      style={iconStyle}
    ></i>
  );
}
