'use client';
import Link from 'next/link';
import {
  Lock,
  MessageSquareMore,
  ScrollText,
  Settings,
  ShieldPlus,
  User,
} from 'lucide-react';
import Sidebar, {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/Sidebar';
import MenuToggle from '@/components/MenuToggle';
import React, { useState } from 'react';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <MenuToggle
        className='absolute z-20 md:hidden'
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
    </>
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
