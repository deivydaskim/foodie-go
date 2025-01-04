'use client';

import ShoppingCartIcon from '@/assets/basic-icons/shopping-cart-icon.svg';
import FoodAddButton from '@/components/shopping-cart/AddRemoveCartButton';
import Button from '@/components/ui/Button';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { formatPrice } from '@/lib/utils';

const ShoppingCartDetails = ({ onClose }: { onClose?: () => void }) => {
  const { groupedItems, subtotalPrice, totalPrice, totalDeliveryFee } =
    useShoppingCart();

  if (groupedItems.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-3 sm:mt-0 sm:px-7 sm:py-6">
        <ShoppingCartIcon />
        <h3 className="body2">Your cart is empty</h3>
        <p className="text-center subtitle1">
          Add items from a restaurant or store to start a new cart
        </p>
        <Button onClick={onClose} className="w-full button">
          Start shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 sm:px-7 sm:py-6">
      {/* Render grouped cart items by restaurantName */}
      <ul className="flex-grow">
        {groupedItems.map(([restaurantName, cartItems]) => (
          <li key={restaurantName}>
            <h1 className="text-2xl capitalize">{restaurantName}</h1>
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-black py-3 last-of-type:border-none"
              >
                <div className="flex flex-col gap-2">
                  <h5 className="capitalize body2">{`${item.quantity} ${item.title}`}</h5>
                  <span className="subtitle1">{formatPrice(item.price)}</span>
                </div>
                <FoodAddButton
                  restaurantName={item.restaurantName}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  restaurantDeliveryFee={item.restaurantDeliveryFee}
                />
              </div>
            ))}
          </li>
        ))}
      </ul>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="subtitle1">Subtotal</span>
          <span className="body2">{formatPrice(subtotalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="subtitle1">Delivery Costs</span>
          <span className="body2">{formatPrice(totalDeliveryFee)}</span>
        </div>
        <div className="flex justify-between">
          <span className="subtitle1">Total</span>
          <span className="body2">{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <Button onClick={onClose} className="mt-2 w-full shrink-0 button">
        Go to checkout
      </Button>
    </div>
  );
};

export default ShoppingCartDetails;
