'use client';

import ShoppingCartIcon from '@/assets/basic-icons/shopping-cart-icon.svg';
import useClickOutside from '@/hooks/useClickOutside';
import { useState } from 'react';
import Button from './Button';
import ShoppingCartDetails from './ShoppingCartDetails';

const ShoppingCartButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleShowDetails = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  const ShoppingCartRef = useClickOutside(close);

  return (
    <div ref={ShoppingCartRef} className="relative flex">
      <Button
        onClick={toggleShowDetails}
        variant="secondary"
        className="relative"
      >
        <ShoppingCartIcon />
        <span className="absolute right-2 top-0 h-4 w-4 rounded-full bg-green text-xs">
          0
        </span>
      </Button>

      {isOpen && <ShoppingCartDetails onClose={close} />}
    </div>
  );
};

export default ShoppingCartButton;
