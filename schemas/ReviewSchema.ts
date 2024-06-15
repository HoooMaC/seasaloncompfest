import * as zod from 'zod';

export const reviewSchema = zod.object({
  name: zod.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  message: zod
    .string()
    .min(3, {
      message: 'Message must be at least 3 characters.',
    })
    .max(250),
  rating: zod.any(),
});
export default reviewSchema;
