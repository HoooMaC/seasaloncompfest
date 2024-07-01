import * as zod from 'zod';

export const MRPRegisterSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8, { message: 'min 8 characters' }),
});
