'use client';
import Image from 'next/image';

import styles from '@/components/Navbar.module.css';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import SignOutButton from '@/components/SignOutButton';
import { User } from 'next-auth';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/utils/cn';
import { LayoutDashboard, LogInIcon, LogOut, UserIcon } from 'lucide-react';
import MenuToggle from '@/components/MenuToggle';

const components: { title: string; href: string; icon?: React.ReactNode }[] = [
  {
    title: 'Dashboard',
    href: '/user',
    icon: <LayoutDashboard />,
  },
];

const Navbar = ({ user }: { user: User | undefined }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  return (
    <nav className='fixed top-0 z-50 w-screen border-b-2 border-b-secondary bg-background'>
      <div className='container flex items-center justify-between p-4 lg:p-0'>
        <Image
          src='/images/logo sea.png'
          alt='sea salon logo'
          className='aspect-square max-w-[80px]'
          width={200}
          height={200}
          layout='responsive'
        />
        <MenuToggle
          value={isNavbarOpen}
          onChange={() => setIsNavbarOpen(prev => !prev)}
        />
        <ul
          className={`absolute ${isNavbarOpen ? 'right-[0]' : 'right-[-100%]'} top-0 flex h-dvh w-[200px] flex-col gap-4 border-l-2 border-secondary bg-background px-8 pt-28 transition-all duration-200 lg:relative lg:right-[unset] lg:h-full lg:w-fit lg:flex-row lg:gap-4 lg:border-0 lg:p-0`}
        >
          <li className={styles.list_item}>
            <Link href='#hero'>Home</Link>
          </li>
          <li className={styles.list_item}>
            <Link href='#about'>About</Link>
          </li>
          <li className={styles.list_item}>
            <Link href='#services'>Services</Link>
          </li>
          <li className={styles.list_item}>
            <Link href='#gallery'>Gallery</Link>
          </li>
          <li className={styles.list_item}>
            <Link href='#book'>Book</Link>
          </li>
          <div className='rounded border-t-2 border-gray-500/15 lg:hidden' />
          {user ? (
            <>
              <li className={`${styles.list_item} lg:hidden`}>
                <Link
                  className={`w-full gap-2 ${buttonVariants({ variant: 'outline' })}`}
                  href='/user'
                >
                  Dashboard
                  <LayoutDashboard></LayoutDashboard>
                </Link>
              </li>
              <li className={`${styles.list_item} lg:hidden`}>
                <SignOutButton className='hover:bg-destructive/10'>
                  SignOut
                  <LogOut size={18}></LogOut>
                </SignOutButton>
              </li>
            </>
          ) : (
            <li className={`${styles.list_item} lg:hidden`}>
              <Link
                className={`w-full gap-2 ${buttonVariants({ variant: 'outline' })}`}
                href='/login'
              >
                Login
                <LogInIcon></LogInIcon>
              </Link>
            </li>
          )}
        </ul>
        <div className='flex hidden p-4 lg:block lg:p-0'>
          {user ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div className='p-2'>
                      <UserIcon />
                    </div>
                    {user.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-fit gap-3 p-4'>
                      {components.map((item, index) => {
                        return (
                          <ListItem
                            key={index}
                            title={item.title}
                            className={`w-full gap-2 ${buttonVariants({ variant: 'outline' })}`}
                            href={item.href}
                          >
                            {item?.icon}
                          </ListItem>
                        );
                      })}
                      <div className='border-gray mx-auto w-4/5 rounded-full border-t' />
                      <SignOutButton className='hover:bg-destructive/10'>
                        SignOut
                        <LogOut size={18}></LogOut>
                      </SignOutButton>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <Link
              className={`h-[40px] w-[180px] ${buttonVariants({
                variant: 'outline',
              })}`}
              href='/login'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
