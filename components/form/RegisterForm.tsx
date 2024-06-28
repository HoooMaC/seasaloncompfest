'use client';
import React, { useEffect, useState, useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormError from '@/components/ui/FormError';
import { Button } from '@/components/ui/button';
import { RegisterSchema } from '@/schemas/AuthSchema';
import { useForm } from 'react-hook-form';

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import createNewAccount from '@/actions/CreateNewAccount';
import { CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Response {
  error?: string;
  success?: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<Response | undefined>();
  const form = useForm<zod.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    },
  });

  useEffect(() => {
    if (response?.success) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [response?.success, router]);

  function onSubmit(values: zod.infer<typeof RegisterSchema>) {
    startTransition(() => {
      createNewAccount(values).then(data => {
        setResponse(data?.response);
      });
    });
  }

  return (
    <>
      {response?.success ? (
        <>
          <CircleCheckBig className='mx-auto size-20 fill-emerald-500'></CircleCheckBig>
          <h3 className='text-center font-bold uppercase'>
            {response.success}
          </h3>
          <p className='text-center'>Redirecting in 3 seconds</p>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='********'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='passwordConfirmation'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password Confirmation</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='********'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormError message={response?.error} />
            <Button type='submit' variant='default' className='w-full'>
              Create new Account
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};
export default RegisterForm;
