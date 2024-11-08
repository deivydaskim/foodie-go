'use client';

import ShoppingCartIcon from '@/assets/basic-icons/shopping-cart-icon.svg';
import { useState } from 'react';
import Button from './Button';

const ShoppingCart = () => {
  const [cart, setCart] = useState(0);

  return (
    <Button variant="secondary" className="relative">
      <ShoppingCartIcon />
      <span className="absolute right-2 top-0 h-4 w-4 rounded-full bg-green text-xs">
        {cart}
      </span>
    </Button>
  );
};

export default ShoppingCart;
