'use server';
import * as zod from 'zod';

import { RegisterSchema } from '@/schemas/AuthSchema';
import { dbPrisma } from '@/lib/dbprisma';
import { hashPassword } from '@/utils/hash';
import assert from 'assert';
import { NextRequest, NextResponse } from 'next/server';
import * as url from 'node:url';
import { redirect } from 'next/navigation';

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

  assert(
    process.env.AUTH_SECRET,
    'Need to provide some AUTH_SECRET in' + ' environment variable'
  );
  const pwHash = hashPassword(password, process.env.AUTH_SECRET);

  try {
    const result = await dbPrisma.user.create({
      data: {
        name: name,
        email: email,
        password: pwHash,
      },
    });
    return { response: { success: 'Register success' } };
  } catch (error) {
    // console.error({ error });
    return { response: { error: 'Something went wrong' } };
  }
}
