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
import assert from 'assert';
import { Service } from '@prisma/client';
import PopupWrapper from '@/components/PopupWrapper';
import ReservationPopup from '@/components/popups/ReservationPopup';

interface ReservationProps {
  serviceList: Service[];
  userName?: string | null; // if user not logged in then it'll be null
  phone?: string | null; // if user not logged in then it'll be null
  className?: string;
}

type ReservationInput = {
  title: string;
  value: string;
};

interface Response {
  error?: string;
  success?: string;
}

const ReservationForm = ({
  serviceList,
  userName,
  phone,
}: ReservationProps) => {
  const [reservationInputString, setReservationInputString] =
    useState<ReservationInput[]>();

  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<Response | undefined>();
  const [currentValue, setCurrentValue] = useState<
    zod.infer<typeof BookingSchema> | undefined
  >();

  const form = useForm<zod.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: userName || undefined,
      phone: phone || undefined,
      type: undefined,
      date: new Date(),
      time: undefined,
    },
  });

  function onSubmit(values: zod.infer<typeof BookingSchema>) {
    setCurrentValue(values);
    setReservationInputString([
      {
        title: 'Name',
        value: values.name,
      },
      {
        title: 'Phone',
        value: values.phone,
      },
      {
        title: 'Type',
        value: values.type,
      },
      {
        title: 'Date & Time',
        // TODO : Check the format
        value: values.date.toString() + values.time,
      },
    ]);
  }

  function sendData() {
    setResponse(undefined);

    startTransition(() => {
      assert(currentValue !== undefined);
      newReservation(currentValue).then(data => {
        setResponse(data?.response);
      });
    });
    form.reset();
  }

  return (
    <>
      {reservationInputString !== undefined && (
        <PopupWrapper
          title='Confirmation'
          description='Please make sure all data you provided are correct'
          leftButtonClickHandle={() => {
            setCurrentValue(undefined);
            setReservationInputString(undefined);
          }}
          rightButtonClickHandle={() => {
            sendData();
            setReservationInputString(undefined);
          }}
        >
          <ReservationPopup data={reservationInputString} />
        </PopupWrapper>
      )}

      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => {
              return (
                <FormItem className='form_item'>
                  <FormLabel className='block w-full text-left'>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Jhon Doe' type='text' />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => {
              return (
                <FormItem className='form_item'>
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
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => {
              return (
                <FormItem className='form_item'>
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
                          <SelectItem key={service.id} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />
          <div className='flex h-fit w-full items-center gap-4'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem className='form_item flex h-full basis-1/2 flex-col'>
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
                          return date < today || date > maxDate;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='time'
              render={({ field }) => {
                return (
                  <FormItem className='form_item flex h-full basis-1/2 flex-col'>
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
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            />
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
    </>
  );
};
export default ReservationForm;
