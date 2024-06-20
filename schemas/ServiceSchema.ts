import * as zod from 'zod';

export const ServiceSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  image: zod.string(),
  // look for better solution
  priceInRupiah: zod.any().transform(v => Number(v) || 0),
  durationInMinute: zod.any().transform(v => Number(v) || 0),
  // isMemberOnly: zod.boolean().default(false), // Not implemented yet
});
