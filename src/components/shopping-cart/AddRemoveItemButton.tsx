'use client';

import PlusIcon from '@/assets/basic-icons/add-icon.svg';
import MinusIcon from '@/assets/basic-icons/minus-icon.svg';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import type { Dish } from '@/types/restaurant';

type AddRemoveItemButtonProps = Pick<Dish, 'id' | 'title' | 'price'> & {
  restaurantName: string;
  restaurantDeliveryFee: number;
  classes?: string;
};

const AddRemoveItemButton = ({
  id,
  title,
  price,
  restaurantName,
  restaurantDeliveryFee,
  classes,
}: AddRemoveItemButtonProps) => {
  const { cartItems, addToCart, decreaseQuantity } = useShoppingCart();

  // Find the current quantity of the dish in the cart
  const itemInCart = cartItems.find(item => item.id === id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-blueGray-100 ${classes ? classes : ''}`}
    >
      {itemInCart && (
        <>
          <button className="h-6 w-6" onClick={() => decreaseQuantity(id)}>
            <MinusIcon />
          </button>
          <span className="select-none font-medium">{quantity}</span>
        </>
      )}
      <button
        className="h-6 w-6"
        onClick={() =>
          addToCart({ id, title, price, restaurantName, restaurantDeliveryFee })
        }
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default AddRemoveItemButton;
