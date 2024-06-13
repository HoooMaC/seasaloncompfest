import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-primary-100 py-4 md:py-10'>
      <div className='container'>
        <Image
          src='/images/logo sea.png'
          alt='sea salon logo'
          className='mx-auto size-40'
          width={200}
          height={200}
          // layout='responsive'
        />
        <div className='flex justify-between gap-4'>
          <div className={`${styles.footer_link} basis-[20%]`}>
            <p className='mb-1 font-bold'>About Us</p>
            <ul>
              <li>
                <a href='#hero'>Home</a>
              </li>
              <li>
                <a href='#services'>Services</a>
              </li>
              <li>
                <a href='#gallery'>Gallery</a>
              </li>
              <li>
                <a href='#reviews'>Reviews</a>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_link} flex-col`}>
            <p className='mb-1 font-bold'>Contact Sea's Salon</p>
            <p>Phone Numbers:</p>
            <p>Thomas: 08123456789</p>
            <p>Sekar: 08164829372</p>
          </div>
        </div>
        <div className='mx-auto my-4 h-1 w-2/3 border-b-2 border-background/50' />
        <p className='mt-2 text-center font-normal text-background'>
          All right reserved ©2024 Designed by{' '}
          <Link href={'https://arzi.tech'} className='font-bold text-accent'>
            Gunawan
          </Link>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
