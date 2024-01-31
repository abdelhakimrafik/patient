import { object, string } from 'zod';

const requiredField = 'Ce champ est obligatoire';
const wrongEmail = 'Votre email est incorrect';

/**
 * Login form schema
 */
export const loginSchema = object({
  email: string()
    .trim()
    // TODO: implement i18n for validation messages
    .min(1, requiredField)
    .email(wrongEmail),
  password: string().min(1, requiredField),
});
