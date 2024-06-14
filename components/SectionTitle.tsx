import { cn } from '@/lib/utils';

interface SectionTitleProps {
  className?: string;
  children: React.ReactNode;
}

const SectionTitle = ({ className, children }: SectionTitleProps) => {
  return (
    <h2
      className={cn(
        `font-outfit text-text mb-12 text-center text-5xl font-medium`,
        className
      )}
    >
      {children}
    </h2>
  );
};
export default SectionTitle;
