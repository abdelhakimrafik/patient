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
   * Icon classname style
   */
  className?: string;

  onClick?: () => void;
};

export default function Icon({ name, className, onClick }: IconProps) {
  return (
    <i
      className={clsx('ico', css[IconSet[name]], className)}
      onClick={onClick}
    ></i>
  );
}
