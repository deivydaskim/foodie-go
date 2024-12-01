type InfoItemProps = {
  icon: React.ReactNode;
  children: string | React.ReactNode;
};

const InfoItem = ({ icon, children }: InfoItemProps) => {
  return (
    <div className="flex justify-center gap-1">
      <span className="text-green">{icon}</span>
      <span>{children}</span>
    </div>
  );
};

export default InfoItem;
