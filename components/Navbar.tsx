'use client';
import Image from 'next/image';

import styles from '@/components/Navbar.module.css';
import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { User } from 'next-auth';
import { SignOutAction } from '@/actions/SignOutAction';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/utils/cn';
import { LayoutDashboard, LogOut, UserIcon } from 'lucide-react';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Logout',
    href: '/api/logout',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
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
        <label
          htmlFor='menu'
          className='relative z-10 flex size-16 scale-75 flex-col items-center justify-center gap-2 md:hidden'
        >
          <input
            type='checkbox'
            className='peer/menu sr-only'
            id='menu'
            onChange={() => setIsNavbarOpen(prev => !prev)}
            checked={isNavbarOpen}
          />
          <div
            className={`${styles.bars_element} top-1/4 duration-100 peer-checked/menu:top-1/2 peer-checked/menu:opacity-0`}
          />
          <div
            className={`${styles.bars_element} top-3/4 duration-100 peer-checked/menu:top-1/2 peer-checked/menu:opacity-0`}
          />
          <div
            className={`${styles.bars_element} top-1/2 opacity-0 delay-100 duration-200 peer-checked/menu:rotate-45 peer-checked/menu:opacity-100`}
          />
          <div
            className={`${styles.bars_element} top-1/2 delay-100 duration-200 peer-checked/menu:-rotate-45`}
          />
        </label>
        <ul
          className={`absolute ${isNavbarOpen ? 'right-[0]' : 'right-[-100%]'} top-0 flex h-dvh w-[200px] flex-col gap-4 border-l-2 border-secondary bg-background px-8 pt-28 transition-all duration-200 md:relative md:h-full md:w-fit md:flex-row md:gap-4 md:border-0 md:p-0 lg:right-[unset]`}
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
        </ul>
        <div className='flex p-4 lg:p-0'>
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
                      <ListItem
                        title={'Dashboard'}
                        className={
                          'flex w-full items-center justify-center gap-2' +
                          ' text-center' +
                          ' text-black'
                        }
                        href={'/user'}
                      >
                        <LayoutDashboard
                          size={18}
                          color='black'
                        ></LayoutDashboard>
                      </ListItem>
                      <form action={SignOutAction}>
                        <Button
                          className='bg-transparent hover:bg-accent'
                          type='submit'
                          // asChild={true}
                        >
                          <ListItem
                            title={'Sign Out'}
                            className={
                              'flex w-full items-center justify-center' +
                              ' text-black hover:bg-transparent' +
                              ' gap-2 hover:text-black'
                            }
                          >
                            <LogOut color='black' size={18}></LogOut>
                          </ListItem>
                        </Button>
                      </form>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <Link
              className='h-[40px] w-[180px] rounded-md bg-background px-4 py-2 text-center transition-all duration-200 hover:bg-accent'
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
