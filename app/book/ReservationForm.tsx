'use client';
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
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { availableTimes } from '@/contants/availableTimes';
import FormError from '@/components/ui/FormError';
import FormSuccess from '@/components/ui/FormSuccess';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { BookingSchema } from '@/schemas/BookingSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { newReservation } from '@/actions/NewReservationAction';

interface ReservationProps {
  className?: string;
}
const ReservationForm = ({ className }: ReservationProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<zod.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      type: '',
      date: new Date(0),
      time: '',
    },
  });

  function onSubmit(values: zod.infer<typeof BookingSchema>) {
    setError('');
    setSuccess('');

    startTransition(() => {
      newReservation(values).then(data => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
    form.reset();
  }
  return (
    <div className={cn('ms-auto w-1/3 p-10', className)}>
      <div className='grid h-full place-content-center'>
        <h2 className='mb-4 text-4xl font-bold'>Booking</h2>
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
                        <Input {...field} placeholder='Jhon Doe' type='text' />
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
                            {/* Later on will be take from database, because
                           teh services will be dynamic*/}
                            <SelectItem value='Hair'>Hair</SelectItem>
                            <SelectItem value='Nail'>Nail</SelectItem>
                            <SelectItem value='Face'>Face</SelectItem>
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
                            disabled={date => date < new Date()}
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
            <FormError message={error} />
            <FormSuccess message={success} />

            <Button variant='default' type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ReservationForm;
