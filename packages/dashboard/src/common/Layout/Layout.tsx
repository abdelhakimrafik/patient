import css from './Layout.style.module.scss';
import Clock from './components/Clock';

export type LayoutProps = React.HTMLAttributes<HTMLDivElement>;

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <div></div>
        <Clock />
        <div></div>
      </header>
      <div className={css.wrapper}>{children}</div>
    </div>
  );
}
