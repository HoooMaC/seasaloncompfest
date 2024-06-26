import React from 'react';

interface SectionProps {
  id?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}
const Section = ({ id, backgroundColor, children }: SectionProps) => {
  return (
    <section
      id={id}
      className={`mx-auto bg-white py-40 text-black ${backgroundColor}`}
    >
      <div className='container mx-auto'>{children}</div>
    </section>
  );
};
export default Section;
