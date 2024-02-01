import { object, string } from 'zod';

const requiredField = 'Ce champ est obligatoire';
const wrongEmail = 'Votre email est incorrect';

/**
 * Signup form schema
 */
export const signupSchema = object({
  firstName: string().min(1, requiredField),
  lastName: string().min(1, requiredField),
  email: string()
    .trim()
    // TODO: implement i18n for validation messages
    .min(1, requiredField)
    .email(wrongEmail),
  password: string().min(1, requiredField),
});
