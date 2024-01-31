import { object, string, enum as Enum } from 'zod';

const requiredField = 'Ce champ est obligatoire';

/**
 * Login form schema
 */
export const patientAddSchema = object({
  // TODO: implement i18n for validation messages
  cardId: string().trim().min(1, requiredField),
  firstName: string().trim().min(1, requiredField),
  lastName: string().trim().min(1, requiredField),
  gender: Enum(['m', 'f']),
  birthday: string().trim().min(1, requiredField),
  insurance: string().uuid(),
  region: string().trim().min(1, requiredField),
  city: string().trim().min(1, requiredField),
  town: string().trim().min(1, requiredField),
  phone: string().trim(),
  address: string().trim().min(1, requiredField),
  additionalAddress: string().trim(),
});
