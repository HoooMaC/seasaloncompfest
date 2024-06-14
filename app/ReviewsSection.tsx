'use client';

import * as zod from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import SectionTitle from '@/components/SectionTitle';
import { reviews } from '@/contants/reviews';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import StarIcon from '@/components/icons/Star';
import FormStar from '@/app/FormStar';
import ReviewCard from '@/components/ReviewCard';

const reviewSchema = zod.object({
  name: zod.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  message: zod
    .string()
    .min(3, {
      message: 'Message must be at least 3 characters.',
    })
    .max(250),
  rating: zod.any(),
});

interface Review {
  name: string;
  rating: number;
  message: string;
}

const ReviewsSection = () => {
  const [allReviews, setAllReviews] = useState<Review[]>(reviews);
  const [newRating, setNewRating] = useState<number>(5);

  const form = useForm<zod.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: '',
      rating: 5,
      message: '',
    },
  });

  const handleRatingChange = (newRating: number) => {
    setNewRating(newRating);
  };

  function onSubmit(values: zod.infer<typeof reviewSchema>) {
    const { name, message } = values;

    const newReview: Review = {
      name: name,
      message: message,
      rating: newRating,
    };

    setAllReviews([...allReviews, newReview]);
    form.reset();
  }

  return (
    <>
      <section id='reviews' className='bg-white py-40 text-black'>
        <div className='container'>
          <SectionTitle className='text-text mb-12'>
            What People Say
          </SectionTitle>
          <div className='mb-12 flex flex-wrap items-center justify-center gap-4'>
            {allReviews.map((review, index) => {
              return (
                review && (
                  <ReviewCard
                    name={review.name}
                    rating={review.rating}
                    message={review.message}
                  />
                )
              );
            })}
          </div>

          <Dialog>
            <DialogTrigger>
              <Button className='hover:bg-primary/50" ms-auto flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                Add Review
              </Button>
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
                      <Button
                        variant='default'
                        type='submit'
                        className='w-full'
                      >
                        Submit
                      </Button>
                    </form>
                  </Form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
};
export default ReviewsSection;
