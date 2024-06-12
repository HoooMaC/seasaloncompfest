import React from 'react';
import Image from 'next/image';

import styles from '@/components/Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='fixed top-0 z-50 w-screen border-b-2 border-b-secondary bg-white'>
      <div className='container flex items-center justify-between'>
        <Image
          src='/images/logo sea.png'
          alt='sea salon logo'
          className='aspect-square max-w-[80px]'
          width={200}
          height={200}
          layout='responsive'
        />
        <ul className='flex gap-4'>
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
