'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function makeGetRequest() {
    try {
      const response = await fetch('http://localhost:8000/api/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Something wrong');
    }
  }
  return (
    <div>
      <Button variant={'secondary'} onClick={makeGetRequest}>
        Make get request
      </Button>
      <div
        id='displayData'
        className='flex flex-col items-center justify-center bg-white'
      >
        {data ? <p>{JSON.stringify(data)}</p> : <p>No Data</p>}
        {error ? <p>something went wrong</p> : <p>No Error</p>}
      </div>
    </div>
  );
};
export default Page;
