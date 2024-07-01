'use client';
import React, { startTransition, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { FormInput } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas/AuthSchema';
import createNewAccount from '@/actions/CreateNewAccount';
import { MRPRegisterSchema } from '@/schemas/MRPRegisterSchema';
import MRPRegisterAction from '@/actions/MRPRegisterAction';

interface MrpAccount {
  name: string;
  username: string;
  email: string;
  password: string;
  role_id: number;
}

const MrpAccountForm = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState();
  const form = useForm<zod.infer<typeof MRPRegisterSchema>>({
    resolver: zodResolver(MRPRegisterSchema),
    // defaultValues: {},
  });
  async function onSubmit(values: zod.infer<typeof MRPRegisterSchema>) {
    const mrpValue: MrpAccount = {
      name: values.name,
      username: values.name,
      email: values.email,
      password: values.password,
      role_id: 1,
    };
    startTransition(async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...mrpValue }),
        });

        if (!response.ok) {
          console.log(`response status: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log({ response });

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          setResponseMessage(JSON.stringify(data, null, 2));
          setError(''); // Reset error message if request is successful
        } else {
          const text = await response.text();
          console.error('Error: Expected JSON, got:', text);
          throw new Error('Expected JSON response but got text/HTML');
        }
      } catch (error) {
        console.error('Error posting data:', error);
        // @ts-ignore
        setError(error.message);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input {...field} type='text' placeholder='jhon doe' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='example@example.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='*******' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type='submit' variant='default' className='w-full'>
            Create new Account
          </Button>
        </form>
      </Form>
      <div>
        {error ? <pre>{JSON.stringify(error, null, 2)}</pre> : null}
        {responseMessage && <pre>{responseMessage}</pre>}
      </div>
    </>
  );
};
export default MrpAccountForm;
