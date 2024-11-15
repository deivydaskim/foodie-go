'use client';

import ShoppingCartIcon from '@/assets/basic-icons/shopping-cart-icon.svg';
import useIsMobileScreen from '@/hooks/useIsMobileScreen';
import { useState } from 'react';
import Button from '../ui/Button';
import Drawer from '../ui/Drawer';
import PopupButton from '../ui/PopupButton';
import ShoppingCartDetails from './ShoppingCartDetails';

const ShoppingCartButton = () => {
  const isMobile = useIsMobileScreen();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const cartButton = (
    <Button
      variant="secondary"
      className="relative"
      onClick={isMobile ? openDrawer : undefined}
    >
      <ShoppingCartIcon />
      <span className="absolute right-2 top-0 h-4 w-4 rounded-full bg-green text-xs">
        {cartItems}
      </span>
    </Button>
  );

  if (isMobile) {
    return (
      <>
        {cartButton}
        {isDrawerOpen && (
          <Drawer title="Shopping Cart" onClose={closeDrawer}>
            <ShoppingCartDetails />
          </Drawer>
        )}
      </>
    );
  }

  return (
    <PopupButton button={cartButton}>
      <ShoppingCartDetails />
    </PopupButton>
  );
};

export default ShoppingCartButton;
