interface SectionTitleProps {
  size?: string;
  color?: string;
  children: React.ReactNode;
}

const SectionTitle = ({ size, color, children }: SectionTitleProps) => {
  return (
    <h2
      className={`mb-12 text-center font-outfit font-medium ${size || 'text-5xl'} ${color || 'text-text'} `}
    >
      {children}
    </h2>
  );
};
export default SectionTitle;
