import * as zod from 'zod';

import { RegisterSchema } from '@/schemas/AuthSchema';

export async function RegisterAction(
  values: zod.infer<typeof RegisterSchema>
) {}
