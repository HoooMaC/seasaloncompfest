'use client';
import Image from 'next/image';

import styles from '@/components/Navbar.module.css';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';

const Navbar = () => {
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
      </div>
    </nav>
  );
};
export default Navbar;
