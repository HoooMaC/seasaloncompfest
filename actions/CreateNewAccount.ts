'use server';
import * as zod from 'zod';

import { redirect } from 'next/navigation';
import { RegisterSchema } from '@/schemas/AuthSchema';

import { dbPrisma } from '@/lib/dbprisma';
import { saltAndHash } from '@/utils/saltAndHash';

export default async function createNewAccount(
  values: zod.infer<typeof RegisterSchema>
) {
  const validateData = RegisterSchema.safeParse(values);
  if (!validateData.success) return { response: { error: 'invalid Fields' } };
  if (validateData.data.password !== validateData.data.passwordConfirmation)
    return { response: { error: "Password confirmation doesn't match" } };

  const { name, email, password } = validateData.data;

  const checkUser = await dbPrisma.user.findUnique({ where: { email } });
  if (checkUser) {
    return { response: { error: 'Email already used' } };
  }

  // TODO Fix hashing problem
  // const pwHash = await saltAndHash(
  //   password,
  //   'generated password from register'
  // );
  const pwHash = password;

  try {
    const result = await dbPrisma.user.create({
      data: {
        name: name,
        email: email,
        password: pwHash,
      },
    });
  } catch (error) {
    console.error({ error });
    throw error;
  }
  return redirect('https://localhost:3000/');
}
