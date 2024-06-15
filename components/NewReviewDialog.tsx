'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReviewSchema from '@/schemas/ReviewSchema';
import PenIcon from '@/components/icons/PenIcon';

const NewReviewDialog = () => {
  const [newRating, setNewRating] = useState<number>(5);

  const handleRatingChange = (newRating: number) => {
    setNewRating(newRating);
  };

  const form = useForm<zod.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      name: '',
      rating: 5,
      message: '',
    },
  });

  function onSubmit(values: zod.infer<typeof ReviewSchema>) {
    const { name, message } = values;

    async function sendData() {
      try {
        const response = await fetch('http://localhost:3000/api/review', {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            message: message,
            rating: newRating,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add review');
        }

        // We keep it for debugging
        // const data = await response.json();
        // console.log(data);
      } catch (error) {
        console.error('Error adding review:', error);
      }
    }

    sendData();

    form.reset();
  }

  const [scope, animate] = useAnimate();

  const animationDuration = 1;

  async function reviewButtonAnimation() {
    await animate(
      scope.current,
      { right: '2.5%' },
      { duration: animationDuration }
    );
    await animate(
      '.chat',
      {
        opacity: [0, 1, 1, 0],
        y: [20, -10, -10, 20],
        transition: {
          opacity: {
            times: [0.05, 0.2, 0.9, 1],
          },
          y: {
            times: [0.05, 0.2, 0.9, 1],
          },
        },
      },
      { duration: 8 }
    );
    await animate(
      scope.current,
      { right: '-100%' },
      { duration: animationDuration }
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      reviewButtonAnimation();
    }, 16000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      ref={scope}
      initial={{ right: '-100%' }}
      // animate={{ right: '2.5%' }}
      // whileHover={{ opacity: 1 }}
      className='fixed bottom-10 right-10 z-50 my-4 flex flex-col items-end'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        // animate={{ x: -10 }}
        className='chat relative w-[250px] rounded-md rounded-br-none bg-background p-2 shadow-lg after:absolute after:-bottom-[15px] after:right-0 after:size-4 after:border-[8px] after:border-transparent after:border-r-background after:border-t-background after:shadow-lg'
      >
        <p>
          {' '}
          Like our services? <br />
          Don't forget to leave a review
        </p>
      </motion.div>
      <Dialog>
        <DialogTrigger className='hover:bg-primary/50" z-10 flex h-fit w-fit items-center justify-center whitespace-nowrap rounded-full bg-primary p-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
          <PenIcon className='size-8' />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mb-4'>
              How do you feel about us?
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  action=''
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <div className='space-y-2'>
                    <FormLabel className='block w-full text-left'>
                      Rating
                    </FormLabel>
                    <FormStar onRatingChange={handleRatingChange} />
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
                      name='message'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel className='block w-full text-left'>
                              Message
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder='Example : The services was very good (max 250 characters).'
                              ></Textarea>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <Button variant='default' type='submit' className='w-full'>
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default NewReviewDialog;
