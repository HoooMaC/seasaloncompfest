import { dbPrisma } from '@/lib/dbprisma';
import assert from 'assert';

export const getSomething = async (something: any) => {
  assert(false);
  try {
    // DO SOME QUERY HERE
    // const services = await dbPrisma.service.findMany({});
    // return { services };
  } catch (error) {
    return { error: error };
  }
};
