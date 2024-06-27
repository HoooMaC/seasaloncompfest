import React from 'react';
import Link from 'next/link';
import { LogOut, ScrollText, Settings, User } from 'lucide-react';
import { SignOutAction } from '@/actions/SignOutAction';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  return (
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
      <div className='flex flex-col gap-2'>
        <Link href='/user/setting' className='flex gap-2'>
          <Settings />
          <span>Settings</span>
        </Link>

        {/*@ts-ignore*/}
        <form action={SignOutAction}>
          <Button
            variant='outline'
            className='text-md group w-full justify-start gap-2 border-none ps-0 font-normal hover:bg-transparent hover:text-destructive'
            type='submit'
          >
            <LogOut
              // color='white'
              className='group-hover:text-destructive'
              // size={18}
            ></LogOut>
            SignOut
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Sidebar;
