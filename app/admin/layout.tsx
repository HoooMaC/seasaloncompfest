import { Card } from '@/components/ui/card';
import Sidebar from '@/components/admin/Sidebar';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-dvh gap-12 bg-background p-10'>
      {/* Sidebar */}
      <Sidebar></Sidebar>

      {/*Main Menu*/}
      <div className='basis-4/5'>
        <Card className='flex h-full w-full flex-col gap-2 border shadow-lg'>
          {children}
        </Card>
      </div>
    </div>
  );
};
export default AdminDashboardLayout;
