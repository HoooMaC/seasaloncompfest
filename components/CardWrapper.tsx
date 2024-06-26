import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CardWrapperProps {
  title: string;
  className?: string;
  description?: string;
  backbuttonHref?: string;
  backbuttonLable?: string;
  backbuttonMessage?: string;
  children?: React.ReactNode;
}

const CardWrapper = ({
  title,
  description,
  className,
  backbuttonMessage,
  backbuttonLable,
  backbuttonHref,
  children,
}: CardWrapperProps) => {
  return (
    <Card className={cn(`w-[400px]`, className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backbuttonHref && (
        <CardFooter className='flex flex-col'>
          <p className='text-center'>
            {backbuttonMessage}&nbsp;
            <Link href={backbuttonHref || ''}>{backbuttonLable}</Link>
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
export default CardWrapper;
