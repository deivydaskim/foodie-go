import PlusIcon from '@/assets/basic-icons/add-icon.svg';
import MinusIcon from '@/assets/basic-icons/minus-icon.svg';

const FoodAddButton = () => {
  return (
    <div className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-blueGray-100">
      <button className="h-6 w-6">
        <MinusIcon />
      </button>
      <span className="font-medium">0</span>
      <button className="h-6 w-6">
        <PlusIcon />
      </button>
    </div>
  );
};

export default FoodAddButton;
