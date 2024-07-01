'use server';
import * as zod from 'zod';

import { dbPrisma } from '@/lib/dbprisma';
import { hashPassword } from '@/utils/hash';
import assert from 'assert';
import { NextRequest, NextResponse } from 'next/server';
import * as url from 'node:url';
import { redirect } from 'next/navigation';
import { MRPRegisterSchema } from '@/schemas/MRPRegisterSchema';

export default async function MRPRegisterAction(
  values: zod.infer<typeof MRPRegisterSchema>
) {
  try {
    // const result = await fetch('http://localhost:8000/api/users', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     ...values,
    //     username: values.name,
    //     role_id: 1,
    //   }),
    // });
  } catch (error) {
    console.error(error);
  }
}
