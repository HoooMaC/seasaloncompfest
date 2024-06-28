import * as zod from 'zod';

export const ServiceSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  image: zod.union([
    zod.string(),
    zod.number(),
    zod.array(zod.string()).readonly(),
    zod.undefined(),
  ]),
  // look for better solution
  priceInRupiah: zod.any().transform(v => Number(v) || 0),
  durationInMinute: zod.any().transform(v => Number(v) || 0),
  // isMemberOnly: zod.boolean().default(false), // Not implemented yet
});
