'use client';
import React, { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PenIcon from '@/components/icons/PenIcon';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import FormStar from '@/app/FormStar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { ServiceSchema } from '@/schemas/ServiceSchema';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReviewSchema from '@/schemas/ReviewSchema';
import { NewServiceAction } from '@/actions/NewServiceAction';
import FormError from '@/components/ui/FormError';
interface Response {
  error?: string;
  success?: string;
}
const NewServiceDialog = () => {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<Response | undefined>();
  const form = useForm<zod.infer<typeof ServiceSchema>>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      image: undefined,
      priceInRupiah: undefined,
      durationInMinute: undefined,
    },
  });

  function onSubmit(values: zod.infer<typeof ServiceSchema>) {
    const result = ServiceSchema.safeParse(values);
    console.log({ result });
    setResponse(undefined);
    startTransition(() => {
      NewServiceAction(values).then(data => {
        setResponse(data?.response);
      });
    });
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger className='inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border border-input p-4 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
        Add New Service
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-4'>How do you feel about us?</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                action=''
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <div className='space-y-2'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className='block w-full text-left'>
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Jhon Doe'
                              type='text'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='priceInRupiah'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className='block w-full text-left'>
                            Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Rp.XXX.XXX'
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className='block w-full text-left'>
                            Service Image
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              // placeholder='Rp.XXX.XXX'
                              type='file'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='durationInMinute'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className='block w-full text-left'>
                            Duration per Session (in minute)
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='0' type='number' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className='block w-full text-left'>
                            Service Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder='Example : The services was very good (max 250 characters).'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  {/*TODO: ADD BRANCH SELECT INPUT*/}
                </div>
                <FormError message={response?.error}></FormError>
                <Button variant='default' type='submit' className='w-full'>
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default NewServiceDialog;
