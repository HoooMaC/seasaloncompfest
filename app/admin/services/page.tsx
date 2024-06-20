import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dbPrisma } from '@/lib/dbprisma';
import NewServiceDialog from '@/components/admin/NewServiceDialog';

const ServicesPage = async () => {
  const allServices = await dbPrisma.service.findMany({
    // include: { branchs: true },
  });
  return (
    <>
      <CardHeader>
        <CardTitle>Manage Service</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Description</TableHead>
              {/*<TableHead>Branch</TableHead>*/}
              {/*<TableHead>Is member only</TableHead>*/}
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allServices.map(service => {
              return (
                <TableRow>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.durationInMinute}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  {/*<TableCell>*/}
                  {/*  {service.branch.address} - {service.branch.city}*/}
                  {/*</TableCell>*/}
                  <TableCell>{service.priceInRupiah}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <NewServiceDialog />
      </CardContent>
    </>
  );
};
export default ServicesPage;
