import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { auth } from '@/auth';
import assert from 'assert';
import { getUserbyId } from '@/data/User';

const AdminPage = async () => {
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
        <CardTitle className='max-md:mx-auto'>Profile</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='font-medium lg:w-[150px]'>Name : </h3>
          <p className=''>{user.name}</p>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='font-medium lg:w-[150px]'>Email : </h3>
          <p className=''>{user.email}</p>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='font-medium lg:w-[150px]'>Password : </h3>
          <p className=''>*****</p>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='font-medium lg:w-[150px]'>Role : </h3>
          <p className=''>{user.role}</p>
        </div>
      </CardContent>
    </>
  );
};
export default AdminPage;
