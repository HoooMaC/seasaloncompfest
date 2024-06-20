import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
import { auth } from '@/auth';
import assert from 'assert';
import { getUserbyId } from '@/data/User';

const SettingPage = async () => {
  const session = await auth();

  // assert because this route must be protected
  // console.log({ session });
  assert(session !== null);
  assert(session.user !== undefined);
  const user = await getUserbyId(session.userId as string);
  assert(user !== null);

  return (
    <>
      <CardHeader>
        <CardTitle>Profile Setting</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='w-[150px] border-r-[1px] border-gray-500/50 font-medium'>
            Name
          </h3>
          <p className='w-full'>{user.name}</p>
          <Button variant='outline'>
            <Wrench size='lg' color='gray' />
          </Button>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='w-[150px] border-r-[1px] border-gray-500/50 font-medium'>
            Email
          </h3>
          <p className='w-full'>{user.email}</p>
          <Button variant='outline'>
            <Wrench size='lg' color='gray' />
          </Button>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='w-[150px] border-r-[1px] border-gray-500/50 font-medium'>
            Password
          </h3>
          <p className='w-full'>*****</p>
          <Button variant='outline'>
            <Wrench size='lg' color='gray' />
          </Button>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='w-[150px] border-r-[1px] border-gray-500/50 font-medium'>
            Role
          </h3>
          <p className='w-full'>{user.role}</p>
          <Button variant='outline'>
            <Wrench size='lg' color='gray' />
          </Button>
        </div>
      </CardContent>
    </>
  );
};
export default SettingPage;
