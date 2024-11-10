'use client';

import BackIcon from '@/assets/basic-icons/back-button.svg';
import ShoppingCartIcon from '@/assets/basic-icons/shopping-cart-icon.svg';
import { useRouter } from 'next/navigation';
import Button from './Button';

type ShoppingCartDetailsProps = {
  onClose: () => void;
};

const ShoppingCartDetails = ({ onClose }: ShoppingCartDetailsProps) => {
  const router = useRouter();

  const handleRedirect = () => {
    onClose();
    router.push('/');
    console.log('Redirected to shopping page');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:absolute md:inset-auto md:right-0 md:top-full md:mt-3 md:w-96 md:rounded-lg md:bg-white md:shadow-lg">
      <div className="h-full w-full bg-white px-8 py-6 md:rounded-lg md:shadow-lg">
        {/* Visible only on mobile/tabs */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={onClose}>
            <BackIcon />
          </button>
          <h2 className="body2">Shopping Cart</h2>
        </div>

        {/* Empty cart details*/}
        <div className="mt-20 flex flex-col items-center gap-3 md:mt-2">
          <ShoppingCartIcon />
          <h3 className="body2">Your cart is empty</h3>
          <p className="text-center subtitle1">
            Add items from a restaurant or store to start a new cart
          </p>
          <Button onClick={handleRedirect} className="w-full button">
            Start shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartDetails;
