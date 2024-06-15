import { dbPrisma } from '@/lib/dbprisma';
import { redirect } from 'next/navigation';

// interface Review {
//   name: string;
//   rating: number;
//   message: string;
// }

export async function POST(req: Request, res: Response) {
  const jsonReq = await req.json();
  try {
    const result = await dbPrisma.review.create({
      data: {
        name: jsonReq.name,
        message: jsonReq.message,
        rating: jsonReq.rating,
      },
    });
    // return Response.redirect(new URL('/', nextUrl));

    return redirect('http://localhost:3000/');
  } catch (error) {
    //
    console.error(error);
    return Response.json({ status: 500, message: 'Internal Server Error' });
  }
}
