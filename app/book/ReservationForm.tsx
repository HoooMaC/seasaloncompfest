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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';
import {
  BellIcon,
  CalendarIcon,
  CheckIcon,
  CrossIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { availableTimes } from '@/contants/availableTimes';
import FormError from '@/components/ui/FormError';
import FormSuccess from '@/components/ui/FormSuccess';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { BookingSchema } from '@/schemas/BookingSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { newReservation } from '@/actions/NewReservationAction';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import assert from 'assert';
import { Service } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getAllServices } from '@/data/Service';
import { handleWebpackExternalForEdgeRuntime } from 'next/dist/build/webpack/plugins/middleware-plugin';

interface ReservationProps {
  serviceList: Service[];
  isLoggedIn: boolean;
  userName?: string | null; // if user not logged in then it'll be null
  className?: string;
}

interface Response {
  error?: string;
  success?: string;
}
const ReservationForm = ({
  serviceList,
  isLoggedIn,
  userName = null,
  className,
}: ReservationProps) => {
  const [inputName, setInputName] = useState<string>(userName || '');

  const [isPending, startTransition] = useTransition();
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [response, setResponse] = useState<Response | undefined>();
  const [currentValue, setCurrentValue] = useState<
    zod.infer<typeof BookingSchema> | undefined
  >();

  const form = useForm<zod.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: undefined,
      phone: undefined,
      type: undefined,
      date: new Date(),
      time: undefined,
    },
  });

  function onSubmit(values: zod.infer<typeof BookingSchema>) {
    setCurrentValue(values);
    setConfirmation(true);
  }

  function sendData() {
    setResponse(undefined);

    startTransition(() => {
      assert(currentValue !== undefined);
      newReservation(currentValue).then(data => {
        setResponse(data.response);
      });
    });
    form.reset();
  }
  return (
    <div className={cn('ms-auto w-1/3 p-10', className)}>
      {confirmation && (
        <div className='absolute inset-0 z-10 grid w-full place-content-center bg-black/50'>
          <Card className={cn('w-[380px]')}>
            <CardHeader>
              <CardTitle>Confirmation</CardTitle>
              <CardDescription>
                Please confirm that all data are right
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='flex items-center space-x-4 rounded-md border p-4'>
                <p className='basis-1/5 text-sm font-medium leading-none'>
                  Name
                </p>
                <div className='basis-4/5 space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    {currentValue?.name}
                  </p>
                </div>
                {/*<Switch />*/}
              </div>
              <div className='flex items-center space-x-4 rounded-md border p-4'>
                <p className='basis-1/5 text-sm font-medium leading-none'>
                  Phone <br /> Number
                </p>
                <div className='basis-4/5 space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    {currentValue?.phone}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4 rounded-md border p-4'>
                <p className='basis-1/5 text-sm font-medium leading-none'>
                  Service <br />
                  type
                </p>
                <div className='basis-4/5 space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    {currentValue?.type}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4 rounded-md border p-4'>
                <p className='basis-1/5 text-sm font-medium leading-none'>
                  Date
                  <br />
                  Time
                </p>
                <div className='basis-4/5 space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    {currentValue?.date.toDateString()} at {currentValue?.time}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className='space-x-2'>
              <Button
                variant='outline'
                className='w-1/2 hover:bg-destructive/60'
                onClick={() => {
                  setCurrentValue(undefined);
                  setConfirmation(false);
                }}
              >
                <XIcon className='mr-2 h-4 w-4' />
                No
              </Button>
              <Button
                onClick={() => {
                  sendData();
                  setConfirmation(false);
                }}
                className='w-1/2 bg-emerald-400 hover:bg-emerald-700'
              >
                <CheckIcon className='mr-2 h-4 w-4' />
                Yes
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      <div className='grid h-full place-content-center'>
        <h2 className='mb-4 text-4xl font-bold'>Make a Reservation</h2>
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
                  const nameField = userName
                    ? {
                        ...field,
                        value: inputName,
                        onChange: event => {
                          setInputName(event.target.value);
                          return;
                        },
                      }
                    : { ...field };
                  return (
                    <FormItem>
                      <FormLabel className='block w-full text-left'>
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...nameField}
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
                name='phone'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='block w-full text-left'>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='+62XX XXXX XXXX'
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
                name='type'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className='w-full text-left'>Type</FormLabel>
                      <FormControl className='w-full'>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Type' />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceList.map((service, index) => (
                              // TODO : id or name for value attribute
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className='flex w-full items-center gap-4'>
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem className='flex h-[64px] basis-1/2 flex-col justify-between space-y-0'>
                      <FormLabel>Select Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => {
                              const maxDate = new Date();
                              maxDate.setDate(maxDate.getDate() + 14);
                              const today = new Date();
                              today.setDate(today.getDate() - 1);
                              // return date < new Date();
                              // return date > maxDate;
                              return date < today || date > maxDate;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='time'
                  render={({ field }) => {
                    return (
                      <FormItem className='h-[64px] basis-1/2 space-y-0'>
                        <FormLabel className='w-full text-left'>Time</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            // Need to disable if the time still empty
                            // disabled
                          >
                            <SelectTrigger className='something w-full'>
                              <SelectValue placeholder='Select Time' />
                            </SelectTrigger>
                            <SelectContent>
                              {/*Need to take from database to select all book
                             in that day and exclude time that already booked*/}
                              {availableTimes.map((time, index) => (
                                <SelectItem key={index} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <FormError message={response?.error} />
            <FormSuccess message={response?.success} />

            <Button
              variant='default'
              disabled={isPending}
              type='submit'
              className='w-full'
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ReservationForm;
