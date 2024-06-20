import { Card } from '@/components/ui/card';
import { MessageSquareMore, ScrollText, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { SignOutAction } from '@/actions/SignOutAction';
import styles from '@/components/Navbar.module.css';
import { Button } from '@/components/ui/button';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className='flex h-dvh gap-12 bg-background p-10'>
    <div className='flex h-dvh gap-12 bg-background p-10'>
      {/*<div>{JSON.stringify(session)}</div>*/}
      {/*<form action={SignOutAction}>*/}
      {/*  <Button type='submit'>SignOut</Button>*/}
      {/*</form>*/}

      {/*Side bar*/}
      <div className='shadow-3xl flex basis-1/5 flex-col justify-between rounded-2xl bg-secondary-200 p-8 text-white'>
        <div>
          <h1 className='text-5xl font-bold'>Sea</h1>
        </div>
        <div className='flex h-full flex-col items-start gap-3 pt-8'>
          <Link href='/user' className='flex gap-2'>
            <User />
            <span>Profile</span>
          </Link>
          <Link href='/user/transactionHistory' className='flex gap-2'>
            <ScrollText />
            <span>Show History</span>
          </Link>
        </div>
        <Link href='/user/setting' className='flex gap-2'>
          <Settings />
          <span>Settings</span>
        </Link>
        <form action={SignOutAction}>
          <Button variant='outline' type='submit'>
            SignOut
          </Button>
        </form>
      </div>

      {/*Main Menu*/}
      <div className='basis-4/5'>
        <Card className='flex h-full w-2/3 flex-col gap-2 border shadow-lg'>
          {children}
        </Card>
      </div>
    </div>
  );
};
export default UserLayout;
