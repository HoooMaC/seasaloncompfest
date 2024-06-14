interface ReviewProps {
  name: string;
  message: string;
  rating: number;
  profile?: string;
}

export const reviews: ReviewProps[] = [
  {
    name: 'Clarice Turner',
    message:
      'I am extremely satisfied with this product! It exceeded my expectations with its quality and performance. The customer service was excellent, and delivery was prompt. I highly recommend this to everyone.',
    rating: 5,
  },
  {
    name: 'Brian Moten',
    message:
      'I am extremely satisfied with this product! It exceeded my expectations with its quality and performance. The customer service was excellent, and delivery was prompt. I highly recommend this to everyone.',
    rating: 5,
  },
];
