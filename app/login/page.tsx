'use client';

import { useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoginSchema } from '@/schemas/AuthSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useState, useTransition } from 'react';
import createNewAccount from '@/actions/CreateNewAccount';
import FormError from '@/components/ui/FormError';
import Link from 'next/link';
import { LoginAction } from '@/actions/LoginAction';

interface Response {
  error?: string;
  success?: string;
}

const RegisterPage = () => {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<Response | undefined>();
  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  function onSubmit(values: zod.infer<typeof LoginSchema>) {
    console.log({ values });
    startTransition(() => {
      LoginAction(values).then(data => {
        setResponse(data?.response);
      });
    });
  }

  return (
    <div className='grid h-dvh w-full place-content-center bg-secondary'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <Card className='w-[400px]'>
            <CardHeader>
              <CardTitle>Login to Your Account</CardTitle>
              {/*<CardDescription>You'll get a lot of benefit</CardDescription>*/}
            </CardHeader>
            <CardContent>
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
                        <Input {...field} type='text' placeholder='********' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
            <CardFooter className='flex flex-col'>
              <FormError message={response?.error} />
              <Button type='submit' variant='default' className='w-full'>
                Login
              </Button>
              <p className='text-center'>
                Don't have account ? <Link href='/register'>Register Here</Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
export default RegisterPage;
