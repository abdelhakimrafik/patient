import css from './ErrorPage.style.module.scss';

export default function ErrorPage() {
  return (
    <div className={css.container}>
      <h1>Oops! 404</h1>
      <p>Page not found.</p>
    </div>
  );
}
