import clsx from 'clsx';
import Clock from './components/Clock';
import css from './Layout.style.module.scss';

export type LayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Whether the content wrapper should be a filled
   */
  fill?: boolean;
};

export default function Layout({
  fill,
  children,
}: LayoutProps): React.JSX.Element {
  return (
    <div className={clsx(css.container, fill && css.filledBg)}>
      <header className={css.header}>
        <div></div>
        <Clock />
        <div></div>
      </header>
      <div className={css.wrapper}>{children}</div>
    </div>
  );
}
