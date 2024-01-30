import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const requiredField = 'Ce champ est obligatoire';
const wrongEmail = 'Votre email est incorrect';

/**
 * Login form resolver
 */
export const loginResolver = yupResolver(
  Yup.object({
    email: Yup.string()
      .trim()
      // TODO: implement i18n for validation messages
      .email(wrongEmail)
      .required(requiredField),
    password: Yup.string().required(requiredField),
  }),
);
