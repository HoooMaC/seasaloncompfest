import React from 'react';

interface FormErrorProps {
  message?: string;
}

const FormSuccess = ({ message }: FormErrorProps) => {
  if (message)
    return (
      <div className='w-full rounded-md border border-emerald-600/70 bg-emerald-300/20 p-2'>
        {message}
      </div>
    );
  return <></>;
};
export default FormSuccess;
