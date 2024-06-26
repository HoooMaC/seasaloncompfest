import CardWrapper from '@/components/CardWrapper';
import RegisterForm from '@/components/form/RegisterForm';

const RegisterPage = () => {
  return (
    <div className='grid h-dvh w-full place-content-center bg-secondary'>
      <CardWrapper
        title='Register'
        backbuttonLable='login here'
        backbuttonHref='/login'
        backbuttonMessage='Already have an account?'
      >
        <RegisterForm />
      </CardWrapper>
    </div>
  );
};
export default RegisterPage;
