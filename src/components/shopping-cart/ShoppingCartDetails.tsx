import ShoppingCartIcon from '@/assets/basic-icons/shopping-cart-icon.svg';
import Button from '../ui/Button';

const ShoppingCartDetails = () => {
  const handleClick = () => {
    console.log('redirect to shopping...');
  };

  return (
    <div className="mt-16 flex flex-col items-center gap-3 sm:mt-2 sm:p-4">
      <ShoppingCartIcon />
      <h3 className="body2">Your cart is empty</h3>
      <p className="text-center subtitle1">
        Add items from a restaurant or store to start a new cart
      </p>
      <Button onClick={handleClick} className="w-full button">
        Start shopping
      </Button>
    </div>
  );
};

export default ShoppingCartDetails;
