import { dbPrisma } from '@/lib/dbprisma';
import { Reservation } from '@prisma/client';

// get reservation by user
export const getReservationsByUserId = async (userId: string) => {
  try {
    const allReservations = await dbPrisma.reservation.findMany({
      where: { customerId: userId },
    });
    return allReservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Could not fetch reservations for the user.');
  }
};
