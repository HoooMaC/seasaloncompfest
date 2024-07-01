import Link from 'next/link';
import {
  Lock,
  MessageSquareMore,
  ScrollText,
  Settings,
  ShieldPlus,
} from 'lucide-react';
import Sidebar, {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/Sidebar';

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>Sea</SidebarHeader>
      <SidebarContent>
        <Link href='/admin/services' className='flex gap-2'>
          <ScrollText />
          Manage Services
        </Link>
        <Link href='/admin/reviews' className='flex gap-2'>
          <MessageSquareMore />
          Manage Reviews
        </Link>

        <div className='w-full rounded-full border border-white/50' />
        <div className='flex gap-2'>
          <Lock />
          Super Admin
        </div>
        <div className='ps-2'>
          <Link href='/admin/admin' className='flex gap-2'>
            <ShieldPlus />
            Manage Admin
          </Link>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <AdminSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
};
export default AdminSidebar;

const AdminSidebarFooter = () => {
  return (
    <Link href='/admin/setting' className='flex gap-2'>
      <Settings />
      Settings
    </Link>
  );
};
