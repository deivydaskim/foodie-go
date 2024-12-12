type InfoItemProps = {
  icon: React.ReactNode;
  children: string | React.ReactNode;
  className?: string;
};

const InfoItem = ({ icon, children, className }: InfoItemProps) => {
  return (
    <div className={`flex justify-center gap-1 ${className && className}`}>
      <span className="text-green">{icon}</span>
      <span>{children}</span>
    </div>
  );
};

export default InfoItem;
