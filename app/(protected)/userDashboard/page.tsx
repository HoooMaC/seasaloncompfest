'use client';

import React, { useEffect, useState } from 'react';
import ProfileSection from '@/components/User/ProfileSection';
import { ScrollText, Settings, User } from 'lucide-react';
import TransactionHistorySection from '@/components/User/TransactionHistorySection';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const UserDashboard = () => {
  const [option, setOption] = useState<string>('profile');
  return (
    <div className='flex h-dvh gap-12 bg-background p-10'>
      {/*<div>{JSON.stringify(session)}</div>*/}
      {/*<form action={SignOutAction}>*/}
      {/*  <Button type='submit'>SignOut</Button>*/}
      {/*</form>*/}

      {/*Side bar*/}
      <div className='shadow-3xl flex basis-1/5 flex-col justify-between rounded-2xl bg-secondary-200 p-8 text-white'>
        <div>
          <h1 className='text-5xl font-bold'>Sea</h1>
        </div>
        <div className='flex h-full flex-col items-start gap-3 pt-8'>
          <button onClick={() => setOption('profile')} className='flex gap-2'>
            <User />
            <span>Profile</span>
          </button>
          <button className='flex gap-2' onClick={() => setOption('history')}>
            <ScrollText />
            <span>Show History</span>
          </button>
        </div>
        <div className='flex gap-2'>
          <Settings />
          <span>Settings</span>
        </div>
      </div>

      {/*Main Menu*/}
      <div className='basis-4/5'>
        <Card className='flex h-full w-2/3 flex-col gap-2 border shadow-lg'>
          {/*<RenderMainMenu option={option} />*/}
          <CardHeader>
            <CardTitle>{option}</CardTitle>e
          </CardHeader>
          <ProfileSection></ProfileSection>
        </Card>
      </div>
    </div>
  );
};
export default UserDashboard;
