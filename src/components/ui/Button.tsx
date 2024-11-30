type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'rounded';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const Button = ({
  variant = 'primary',
  onClick,
  className = '',
  children,
}: ButtonProps) => {
  const variants = {
    primary: 'bg-green text-white hover:bg-darkGreen',
    secondary: 'text-black hover:bg-blueGray-100',
    rounded: 'hover:bg-blueGray-100 flex w-9 items-center justify-center !px-0',
  };

  const variantClasses = variants[variant] || '';

  return (
    <button
      onClick={onClick}
      className={`h-9 text-nowrap rounded-full px-4 transition button ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
