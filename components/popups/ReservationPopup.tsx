type ReservationInput = {
  title: string;
  value: string;
};

interface ReservationPopupProps {
  data: ReservationInput[] | undefined;
}

const ReservationPopup = ({ data }: ReservationPopupProps) => {
  return (
    <>
      {data?.map(({ title, value }, index) => {
        return (
          <div className='flex items-center space-x-4 rounded-md border p-4'>
            <p className='basis-1/5 text-sm font-medium leading-none'>
              {title}
            </p>
            <div className='basis-4/5 space-y-1'>
              <p className='text-sm text-muted-foreground'>{value}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ReservationPopup;
