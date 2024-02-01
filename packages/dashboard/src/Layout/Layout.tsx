import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import Clock from './components/Clock';
import { useLogoutUserMutation } from '../redux/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/authSlice';
import css from './Layout.style.module.scss';

export type LayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Whether the content wrapper should be a filled
   */
  fill?: boolean;
};

export default function Layout({ fill }: LayoutProps): React.JSX.Element {
  /** Code added for logout purpose */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { credentials } = useSelector((state) => (state as any).authState);

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
    } catch (e) {
      console.log('ERR', e);
    }
  };

  return (
    <div className={clsx(css.container, fill && css.filledBg)}>
      <header className={css.header}>
        <div></div>
        <Clock />
        <div>
          {credentials ? (
            <i className={css.logout} onClick={handleLogout}>
              Logout
            </i>
          ) : null}
        </div>
      </header>
      <main className={css.wrapper}>
        <Outlet />
      </main>
    </div>
  );
}
