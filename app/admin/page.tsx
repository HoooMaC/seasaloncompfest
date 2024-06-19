import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const UserDashboard = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardHeader>
        <User />
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='w-[150px] border-r-[1px] border-gray-500/50 font-medium'>
            Name
          </h3>
          <p className='w-full'>user.name</p>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='w-[150px] border-r-[1px] border-gray-500/50 font-medium'>
            Email
          </h3>
          <p className='w-full'>user.email</p>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='w-[150px] border-r-[1px] border-gray-500/50 font-medium'>
            Password
          </h3>
          <p className='w-full'>*****</p>
        </div>
        <div className='flex items-center space-x-4 rounded-md border p-4'>
          <h3 className='w-[150px] border-r-[1px] border-gray-500/50 font-medium'>
            Role
          </h3>
          <p className='w-full'>user.role</p>
        </div>
      </CardContent>
    </>
  );
};
export default UserDashboard;
