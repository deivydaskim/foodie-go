'use client';

import ShoppingCartIcon from '@/assets/basic-icons/shopping-cart-icon.svg';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import useIsMobileScreen from '@/hooks/useIsMobileScreen';
import { useState } from 'react';
import Button from '../ui/Button';
import Drawer from '../ui/Drawer';
import PopupButton from '../ui/PopupButton';
import ShoppingCartDetails from './ShoppingCartDetails';

const ShoppingCartButton = () => {
  const isMobile = useIsMobileScreen();
  const { totalItems } = useShoppingCart();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const cartButton = (
    <Button
      variant="rounded"
      className="relative"
      onClick={isMobile ? openDrawer : undefined}
    >
      <ShoppingCartIcon />
      <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-green text-xs">
        {totalItems}
      </span>
    </Button>
  );

  return isMobile ? (
    <>
      {cartButton}
      {isDrawerOpen && (
        <Drawer title="Shopping Cart" onClose={closeDrawer}>
          <ShoppingCartDetails onClose={closeDrawer} />
        </Drawer>
      )}
    </>
  ) : (
    <PopupButton button={cartButton}>
      {({ close }) => <ShoppingCartDetails onClose={close} />}
    </PopupButton>
  );
};

export default ShoppingCartButton;
