import * as zod from 'zod';

export const RegisterSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8, { message: 'min 8 characters' }),
  passwordConfirmation: zod.string().min(8, { message: 'min 8 characters' }),
});

export const LoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
