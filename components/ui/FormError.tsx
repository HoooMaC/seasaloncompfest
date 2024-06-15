import React from 'react';

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (message)
    return (
      <div className='w-full rounded-md border border-destructive bg-destructive/20 p-2'>
        {message}
      </div>
    );
  return <></>;
};
export default FormError;
