type FoodCard = {
  icon: React.ReactElement;
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const FoodCard = ({ icon, title, isActive, onClick }: FoodCard) => (
  <button
    onClick={onClick}
    className="flex w-[76px] flex-shrink-0 flex-col items-center gap-1 caption hover:text-gray-600"
  >
    {icon}
    <p>{isActive ? `\u2714 ${title}` : title}</p>
  </button>
);

export default FoodCard;
