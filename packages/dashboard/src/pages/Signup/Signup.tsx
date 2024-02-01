import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOf } from 'zod';
import Button from '../../components/Button';
import { InputWithFormHook as Input } from '../../components/Input';
import { signupSchema } from './Signup.validation';
import css from './Signup.style.module.scss';
import { useSignupUserMutation } from '../../redux/api/authApi';

export type TSignupFormData = TypeOf<typeof signupSchema>;

export default function Signup(): React.JSX.Element {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<TSignupFormData>({
    mode: 'all',
    resolver: zodResolver(signupSchema),
  });

  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMessage = (error as any)?.data?.message[0];

  const onSubmit = async (data: TSignupFormData) => {
    try {
      await signupUser(data);
      navigate('/auth/login');
    } catch (e) {
      console.log('ERR', e);
    }
  };

  return (
    <div className={css.container}>
      <span className={css.title}>Creer votre compte</span>
      <Input
        control={control}
        controllerName="lastName"
        placeholder="Entrez votre nom"
      />
      <Input
        control={control}
        controllerName="firstName"
        placeholder="Entrez votre prenom"
      />
      <Input
        control={control}
        controllerName="email"
        type="email"
        placeholder="Entrez votre email"
      />
      <Input
        control={control}
        controllerName="password"
        type="password"
        placeholder="Tapez votre mot de passe"
      />
      <Input
        control={control}
        controllerName="confirmPassword"
        type="password"
        placeholder="Confirmer votre mot de passe"
      />
      {errorMessage ? <div className={css.error}>{errorMessage}</div> : null}
      <Button
        full
        text="Register"
        iconRight="ChevronDouble"
        className={css.submitBtn}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />

      <Link to="/auth/login" className={css.link}>
        Se connecter
      </Link>
    </div>
  );
}
