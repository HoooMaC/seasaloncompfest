import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionHistorySection from '@/components/User/TransactionHistorySection';
import { getReservationsByUserId } from '@/data/Reservation';
import { auth } from '@/auth';
import { dbPrisma } from '@/lib/dbprisma';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const TransactionHistoryPage = async () => {
  const session = await auth();
  console.log({ session });
  // Need to get all the history section
  const allReservations = await dbPrisma.reservation.findMany({
    where: {
      customerId: session?.userId,
    },
    include: {
      service: true,
      customer: true,
      branch: true,
    },
  });
  console.log(allReservations);
  return (
    <>
      <CardHeader>
        <CardTitle>Reservation History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            {allReservations ? (
              <p> A list of your reservations.</p>
            ) : (
              <p> You dont have any history </p>
            )}{' '}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className='text-right'>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allReservations.map(reservation => {
              return (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>{reservation.phone}</TableCell>
                  <TableCell>{reservation.service.name}</TableCell>
                  <TableCell>{reservation.date.toDateString()}</TableCell>
                  <TableCell>
                    {reservation.startTime} - {reservation.endTime}
                  </TableCell>
                  <TableCell>{reservation?.branch?.address}</TableCell>
                  <TableCell>{reservation.service.priceInRupiah}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Button className='ms-auto block' variant='outline'>
          Make a new reservation
        </Button>
      </CardContent>
    </>
  );
};
export default TransactionHistoryPage;
