import { Card } from '@/components/ui/card';
import Sidebar from '@/components/User/Sidebar';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-dvh bg-background md:gap-4 md:p-10 xl:gap-12'>
      {/*Side bar*/}
      <Sidebar />
      {/*Main Menu*/}
      <div className='w-full md:basis-3/5 lg:basis-4/5'>
        <Card className='flex h-full w-full flex-col gap-2 border shadow-lg'>
          {children}
        </Card>
      </div>
    </div>
  );
};
export default UserLayout;
