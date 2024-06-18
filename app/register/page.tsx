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
import { RegisterSchema } from '@/schemas/AuthSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import assert from 'assert';
import { newReservation } from '@/actions/NewReservationAction';
import { useState, useTransition } from 'react';
import createNewAccount from '@/actions/CreateNewAccount';
import FormError from '@/components/ui/FormError';
import Link from 'next/link';

interface Response {
  error?: string;
  success?: string;
}

const RegisterPage = () => {
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

  function onSubmit(values: zod.infer<typeof RegisterSchema>) {
    console.log({ values });
    startTransition(() => {
      createNewAccount(values).then(data => {
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
              <CardTitle>Register for Free</CardTitle>
              <CardDescription>You'll get a lot of benefit</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <p className='text-center'>
                Already have an account ? <Link href='/login'>Click Here</Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
export default RegisterPage;
