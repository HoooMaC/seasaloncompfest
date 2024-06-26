import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';

interface PopupWrapperProps {
  title: string;
  description: string;
  leftButtonClickHandle: React.MouseEventHandler<HTMLButtonElement>;
  rightButtonClickHandle: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const PopupWrapper = ({
  title,
  description,
  leftButtonClickHandle,
  rightButtonClickHandle,
  children,
}: PopupWrapperProps) => {
  return (
    <div className='absolute inset-0 z-10 grid w-full place-content-center bg-black/50'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <div className='my-2 flex w-full gap-2'>
            <Button
              variant='outline'
              className='w-1/2 hover:bg-destructive/60'
              onClick={leftButtonClickHandle}
            >
              <XIcon className='mr-2 h-4 w-4' />
              No
            </Button>
            <Button
              onClick={rightButtonClickHandle}
              className='w-1/2 bg-emerald-400 hover:bg-emerald-700'
            >
              <CheckIcon className='mr-2 h-4 w-4' />
              Yes
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default PopupWrapper;
