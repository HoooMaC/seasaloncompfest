import { dbPrisma } from '@/lib/dbprisma';
import { redirect } from 'next/navigation';
import { json } from 'node:stream/consumers';

// interface Review {
//   name: string;
//   rating: number;
//   message: string;
// }

// export async function POST(request: Request) {
//   // this is work with client but not with postman
//   const res = await request.json();
//   console.log(JSON.stringify(res, null, 2));
//   try {
//     const result = await dbPrisma.reservation.create({
//       data: {
//         name: res.name,
//         phone: res.phone,
//         type: res.type,
//         date: res.date,
//         time: res.time,
//       },
//     });
//
//     return new Response(JSON.stringify(result), {
//       headers: {
//         contentType: 'application/json',
//       },
//       status: 201,
//     });
//
//     // return redirect('http://localhost:3000/');
//   } catch (error) {
//     //
//     console.error(error);
//
//     return Response.json({ status: 500, message: { error } });
//   }
// }
