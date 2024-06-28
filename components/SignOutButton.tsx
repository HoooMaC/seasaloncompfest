'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { signOut } from '@/auth';
import { SignOutAction } from '@/actions/SignOutAction';
import { cn } from '@/lib/utils';

interface SignOutButtonProps {
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
  className?: string;
  children?: React.ReactNode;
}

const SignOutButton = ({
  className,
  variant = 'outline',
  children,
}: SignOutButtonProps) => {
  return (
    // @ts-ignore
    <form action={SignOutAction}>
      <Button
        className={cn(
          `w-full gap-2 bg-transparent hover:bg-transparent hover:text-destructive`,
          className
        )}
        type='submit'
        variant={variant}
      >
        {children}
      </Button>
    </form>
  );
};

export default SignOutButton;
