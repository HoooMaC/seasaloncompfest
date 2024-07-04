import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { dbPrisma } from '@/lib/dbprisma';

const ReviewsPage = async () => {
  const allReview = await dbPrisma.review.findMany({});
  return (
    <>
      <CardHeader>
        <CardTitle className='max-md:mx-auto'>Manage Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Message</TableHead>
              {/*<TableHead>Date</TableHead>*/}
              <TableHead>Branch</TableHead>
              <TableHead className='text-right'>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allReview.map(review => {
              return (
                <TableRow>
                  <TableCell className='font-medium'>{review.id}</TableCell>
                  <TableCell>{review.name}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.message}</TableCell>
                  <TableCell className='text-right'>
                    {review.createdAt.toLocaleDateString('en-US')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
};
export default ReviewsPage;
