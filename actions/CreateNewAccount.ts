'use server';
import * as zod from 'zod';
import bcrypt from 'bcryptjs';

import { redirect } from 'next/navigation';
import { RegisterSchema } from '@/schemas/AuthSchema';

import { dbPrisma } from '@/lib/dbprisma';

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

  const salt = await bcrypt.genSalt(10);
  const pwHash = await bcrypt.hash(password, salt);

  const result = await dbPrisma.user.create({
    data: {
      name: name,
      email: email,
      password: pwHash,
    },
  });

  return redirect('https://localhost:3000/');
}
