'use client';

import CardWrapper from '@/components/CardWrapper';
import LoginForm from '@/components/form/LoginForm';

const RegisterPage = () => {
  return (
    <div className='grid h-dvh w-full place-content-center bg-secondary'>
      <CardWrapper
        title='Login to your Account'
        backbuttonHref='/register'
        backbuttonMessage='Dont have account ?'
        backbuttonLable='register here'
      >
        <LoginForm />
      </CardWrapper>
    </div>
  );
};
export default RegisterPage;
