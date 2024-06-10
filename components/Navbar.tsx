import React from 'react';
import Image from 'next/image';

import styles from '@/components/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className='fixed top-0 z-50 bg-white w-screen border-b-2 border-b-secondary px-10'>
      <div className='container mx-auto flex items-center justify-between'>
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
            Home
          </li>
          <li className='text-black cursor-pointer hover:font-medium hover:text-primary'>
            About
          </li>
          <li className='text-black cursor-pointer hover:font-medium hover:text-primary'>
            Services
          </li>
          <li className='text-black cursor-pointer hover:font-medium hover:text-primary'>
            Contact
          </li>
          <li className='text-black cursor-pointer hover:font-medium hover:text-primary'>
            Explore More
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
