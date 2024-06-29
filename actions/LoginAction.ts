'use server';
import * as zod from 'zod';
import { LoginSchema } from '@/schemas/AuthSchema';
import { signIn } from '@/auth';
import { sign } from 'node:crypto';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const LoginAction = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { response: { error: 'Invalid Fields' } };

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email: email,
      password: password,
    });
    return { response: { succes: 'Login Sucessful' } };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { response: { error: 'Invalid credentials' } };
        case 'JWTSessionError':
          return { response: { error: 'JWTSessionError' } };
        default:
          return { response: { error: 'Something went wrong' } };
      }
    }
    throw error;
  }
};
