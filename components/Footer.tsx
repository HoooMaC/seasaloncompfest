import Image from 'next/image';

const Footer = () => {
  return <footer className="h-80 bg-primary-100 px-20 py-10">
    {/*  ----------------------------------------------------------------------*/}
    <div
      className="flex text-white flex-col justify-center max-w-[500px] bg-accent h-full items-start">
      <h5>Elegance</h5>
      <p>Experience the beauty and elegance of our services</p>
      <p>© 2024. All rights reserved.</p>
      <div className='flex gap-4'>
        {/*<Image src='/Svgs/LinkedIn.svg' width={50} height={50} alt="LinkedIn" />*/}

      </div>
    </div>
    <div>
      <div></div>
      <div></div>
    </div>
  </footer>;
};
export default Footer;
