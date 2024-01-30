import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import css from './Login.style.module.scss';

const select1Data = [{ name: 'UM Amezmiz' }];
const select2Data = [{ name: 'BOX 1' }];

export default function Login(): React.JSX.Element {
  return (
    <div className={css.container}>
      <span className={css.title}>Connectez-vous à votre compte</span>
      <Select items={select1Data} className={css.select} />
      <Select items={select2Data} className={css.select} />
      <hr style={{ width: '100%' }} color="#D7D7D7" />
      <Input type="email" placeholder="Entrez votre identifiant / email" />
      <Input type="password" placeholder="Tapez votre mot de passe" />
      <Button
        text="Connexion"
        iconRight="ChevronDouble"
        className={css.submitBtn}
      />
    </div>
  );
}
