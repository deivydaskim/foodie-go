type ButtonProps = {
  variant?: 'primary' | 'secondary';
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
  };

  const variantClasses = variants[variant] || '';

  return (
    <button
      onClick={onClick}
      className={`h-9 text-nowrap rounded-full px-4 transition ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
