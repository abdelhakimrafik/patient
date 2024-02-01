import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOf } from 'zod';
import Button from '../../components/Button';
import { InputWithFormHook as Input } from '../../components/Input';
import Select from '../../components/Select';
import { loginSchema } from './Login.validation';
import css from './Login.style.module.scss';
import { useLoginUserMutation } from '../../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/features/authSlice';

const select1Data = [{ name: 'UM Amezmiz' }];
const select2Data = [{ name: 'BOX 1' }];

export type TLoginFormData = TypeOf<typeof loginSchema>;

export default function Login(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm<TLoginFormData>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const onSubmit = async (data: TLoginFormData) => {
    try {
      const payload = await loginUser(data).unwrap();
      dispatch(
        setCredentials({
          access_token: payload.access_token,
          refresh_token: payload.refresh_token,
        }),
      );
      navigate('/');
    } catch (e) {
      console.log('ERR', e);
    }
  };

  return (
    <div className={css.container}>
      <span className={css.title}>Connectez-vous à votre compte</span>
      <Select items={select1Data} className={css.select} />
      <Select items={select2Data} className={css.select} />
      <hr style={{ width: '100%' }} color="#D7D7D7" />
      <Input
        control={control}
        controllerName="email"
        type="email"
        placeholder="Entrez votre identifiant / email"
      />
      <Input
        control={control}
        controllerName="password"
        type="password"
        placeholder="Tapez votre mot de passe"
      />
      {error ? (
        <div className={css.error}>Email ou mot de passe est incorrect</div>
      ) : null}
      <Button
        full
        text="Connexion"
        iconRight="ChevronDouble"
        className={css.submitBtn}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
      <Link to="/auth/signup" className={css.link}>
        S'inscrire
      </Link>
    </div>
  );
}
