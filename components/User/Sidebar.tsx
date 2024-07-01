'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { LogOut, ScrollText, Settings, User } from 'lucide-react';

import SignOutButton from '@/components/SignOutButton';
import Sidebar, {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/Sidebar';
import MenuToggle from '@/components/MenuToggle';

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <MenuToggle
        className='absolute md:hidden'
        value={isOpen}
        onChange={() => {
          setIsOpen(prevState => !prevState);
        }}
      />
      <Sidebar
        className={
          isOpen
            ? 'absolute inset-0 grid place-content-center'
            : 'inset-[unset] hidden'
        }
      >
        <SidebarHeader>Sea</SidebarHeader>
        <SidebarContent>
          <div className='flex h-[200px] w-full flex-col items-start justify-start gap-3 py-8'>
            <Link href='/user' className='flex gap-2'>
              <User />
              <span>Profile</span>
            </Link>
            <Link href='/user/transactionHistory' className='flex gap-2'>
              <ScrollText />
              <span>Show History</span>
            </Link>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <UserSidebarFooter />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

const UserSidebarFooter = () => {
  return (
    <div className='flex flex-col gap-2'>
      <SignOutButton className='justify-start border-none p-0'>
        <LogOut />
        SignOut
      </SignOutButton>
    </div>
  );
};

export default UserSidebar;
