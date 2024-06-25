import Link from 'next/link';
import {
  Lock,
  MessageSquareMore,
  ScrollText,
  Settings,
  ShieldPlus,
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className='shadow-3xl flex basis-1/5 flex-col justify-between rounded-2xl bg-secondary-200 p-8 text-white'>
      <div>
        <h1 className='text-5xl font-bold'>Sea</h1>
      </div>
      <div className='flex h-full flex-col items-start gap-3 pt-8'>
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
      </div>
      <Link href='/admin/setting' className='flex gap-2'>
        <Settings />
        Settings
      </Link>
    </div>
  );
};
export default Sidebar;
