import React, { useState, useTransition } from 'react';
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
import { useForm } from 'react-hook-form';

import * as zod from 'zod';
import { LoginSchema } from '@/schemas/AuthSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginAction } from '@/actions/LoginAction';

interface Response {
  error?: string;
  success?: string;
}

const LoginForm = () => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
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
        <FormError message={response?.error} />
        <Button type='submit' variant='default' className='w-full'>
          Login
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
