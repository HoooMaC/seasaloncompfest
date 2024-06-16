import { dbPrisma } from '@/lib/dbprisma';

const ShowAllReservation = async () => {
  const reservationList = await dbPrisma.reservation.findMany();
  return (
    <div className='container h-dvh bg-secondary p-20'>
      {reservationList.map((item, index) => {
        return (
          <div key={index} className='flex justify-between divide-accent-50'>
            <p>{item.id}</p>
            <h1>{item.name}</h1>
            <p>{item.phone}</p>
            <p>{item.type}</p>
            <p>{item.date}</p>
            <p>{item.time}</p>
          </div>
        );
      })}
    </div>
  );
};
export default ShowAllReservation;
