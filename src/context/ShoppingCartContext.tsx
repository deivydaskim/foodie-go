'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type CartItem = {
  id: string;
  price: number;
  title: string;
  quantity: number;
  restaurantName: string;
};

type AddCartItem = Omit<CartItem, 'quantity'>;

type ShoppingCartContextType = {
  cartItems: CartItem[];
  groupedItems: [string, CartItem[]][];
  subtotalPrice: number;
  totalPrice: number;
  totalItems: number;
  addToCart: (item: AddCartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined,
);

export const ShoppingCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: AddCartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      return existingItem
        ? prevItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, value: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + value } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const increaseQuantity = (id: string) => updateQuantity(id, 1);

  const decreaseQuantity = (id: string) => updateQuantity(id, -1);

  const groupedItems = useMemo(() => {
    const map = new Map<string, CartItem[]>();
    cartItems.forEach(item => {
      if (!map.has(item.restaurantName)) {
        map.set(item.restaurantName, []);
      }
      map.get(item.restaurantName)!.push(item);
    });

    // Convert the Map to an array of key-value pairs
    return Array.from(map.entries());
  }, [cartItems]);

  const subtotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Later store fee for delivery from each restaurant and add it to total price;
  const DELIVERY_FEE = 0;
  const totalPrice = subtotalPrice + DELIVERY_FEE;

  const totalItems = cartItems.reduce(
    (count, item) => count + item.quantity,
    0,
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        groupedItems,
        totalItems,
        subtotalPrice,
        totalPrice,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider',
    );
  }
  return context;
};
