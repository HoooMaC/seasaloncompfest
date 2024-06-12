import { cn } from '@/utils/cn';

export function SecondaryButton(props) {
  return (
    <button
      className={cn(
        `text-whit mt-2 w-[fit-content] rounded-lg bg-secondary px-10 py-4`,
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
