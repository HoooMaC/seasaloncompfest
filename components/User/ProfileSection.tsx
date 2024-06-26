import { auth } from '@/auth';
import { getUserbyId } from '@/data/User';
import assert from 'assert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileSection = async () => {
  const session = await auth();

  // assert because this route must be protected
  // console.log({ session });
  assert(session !== null);
  assert(session.user !== undefined);
  // TODO
  // @ts-ignore
  const user = await getUserbyId(session.userId);
  assert(user !== null);

  return (
    <>
      <CardHeader>
        <User />
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-grow-0 items-center space-x-4 rounded-md border p-4'>
          <h3 className='border-r-[1px] border-gray-500/50 font-medium lg:w-[150px]'>
            Name
          </h3>
          <p className='w-full'>{user.name}</p>
        </div>
        <div className='flex flex-grow-0 items-center space-x-4 rounded-md border p-4'>
          <h3 className='border-r-[1px] border-gray-500/50 font-medium lg:w-[150px]'>
            Email
          </h3>
          <p className='w-full'>{user.email}</p>
        </div>
        <div className='flex flex-grow-0 items-center space-x-4 rounded-md border p-4'>
          <h3 className='border-r-[1px] border-gray-500/50 font-medium lg:w-[150px]'>
            Password
          </h3>
          <p className='w-full'>*****</p>
        </div>
        <div className='flex flex-grow-0 items-center space-x-4 rounded-md border p-4'>
          <h3 className='border-r-[1px] border-gray-500/50 font-medium lg:w-[150px]'>
            Role
          </h3>
          <p className='w-full'>{user.role}</p>
        </div>
      </CardContent>
    </>
  );
};
export default ProfileSection;
