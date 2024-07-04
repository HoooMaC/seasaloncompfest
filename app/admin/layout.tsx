import { Card } from '@/components/ui/card';
import Sidebar from '@/components/admin/Sidebar';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-dvh bg-background md:gap-4 xl:gap-12'>
      {/* Sidebar */}
      <Sidebar></Sidebar>

      {/*Main Menu*/}
      <Card className='flex h-full w-full flex-col gap-2 border shadow-lg'>
        {children}
      </Card>
    </div>
  );
};
export default AdminDashboardLayout;
