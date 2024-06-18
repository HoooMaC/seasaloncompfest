import { dbPrisma } from '@/lib/dbprisma';

export const getUserbyId = async (userId: string) => {
  const user = await dbPrisma.user.findUnique({
    where: { id: userId },
  });
  return user;
};
