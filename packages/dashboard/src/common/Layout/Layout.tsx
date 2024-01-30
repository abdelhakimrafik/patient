import Icon from '../../components/Icon';
import css from './Layout.style.module.scss';

export type LayoutProps = React.HTMLAttributes<HTMLDivElement>;

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <div></div>
        <div className={css.headerContent}>
          <div>
            <Icon name="Calendar" color="#54BBCD" />
            Mercredi 12 juillet
          </div>
          <div>
            <Icon name="Horloge" color="#54BBCD" />
            19:31
          </div>
        </div>
        <div></div>
      </header>
      <div className={css.wrapper}>{children}</div>
    </div>
  );
}
