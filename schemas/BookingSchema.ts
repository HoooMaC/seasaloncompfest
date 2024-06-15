import * as zod from 'zod';

export enum ServiceType {
  Hair = 'Hair',
  Nail = 'Nail',
  Face = 'Face',
}

export const BookingSchema = zod.object({
  name: zod.string({
    message: 'Name is Required',
  }),
  phone: zod
    .string({
      message: 'Phone number is required',
    })
    .min(11, {
      message: 'Invalid format',
    })
    .max(13, {
      message: 'Invalid format',
    }),
  type: zod.string(),
  date: zod.date(),
  time: zod.string(),
});
