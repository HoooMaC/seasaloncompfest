import { Service } from '@prisma/client';
import { dbPrisma } from '@/lib/dbprisma';

export const getAllServices = async (): Promise<Service[]> => {
  try {
    const result = await dbPrisma.service.findMany({});
    return result;
  } catch (error) {
    return { error: error };
  }
};

export const getServiceByBranch = async (branchId: string) => {
  // TODO : How to query from M to M relationship
  try {
    const result = await dbPrisma.service.findMany({
      // where: { branch: branchId },
    });
    return { result };
  } catch (error) {
    return { error: error };
  }
};
