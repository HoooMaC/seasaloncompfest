import React from 'react';
import { cn } from '@/lib/utils';

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className='text-5xl font-bold'>{children}</div>;
};
export const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full flex-col items-start gap-3'>{children}</div>
  );
};
export const SidebarFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex flex-col gap-2'>{children}</div>;
};

const Sidebar = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    // TODO : Add back button
    <>
      <div
        className={cn(
          'shadow-3xl absolute h-full flex-col justify-between md:relative' +
            ' z-10 bg-secondary-200 p-4 text-white' +
            ' md:flex' +
            ' lg:basis-1/5 lg:p-8',
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
export default Sidebar;
