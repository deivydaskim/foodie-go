type SwitchLabelProps = {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: string;
  isActive: boolean;
};

const SwitchLabel = ({ Icon, children, isActive }: SwitchLabelProps) => {
  return (
    <span className="z-10 w-1/2 text-black">
      {Icon && (
        <Icon
          className={`mr-1 inline-block transition-colors ${isActive && 'text-green'}`}
        />
      )}
      {children}
    </span>
  );
};

export default SwitchLabel;
