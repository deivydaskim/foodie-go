'use client';

import { createContext, useContext, useState } from 'react';

type PickupDeliveryContextType = {
  isPickup: boolean;
  togglePickupDelivery: () => void;
};

const PickupDeliveryContext = createContext<
  PickupDeliveryContextType | undefined
>(undefined);

export const PickupDeliveryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPickup, setIsPickup] = useState(false);

  const togglePickupDelivery = () => {
    setIsPickup(prevState => !prevState);
  };

  return (
    <PickupDeliveryContext.Provider value={{ isPickup, togglePickupDelivery }}>
      {children}
    </PickupDeliveryContext.Provider>
  );
};

export const usePickupDelivery = () => {
  const context = useContext(PickupDeliveryContext);
  if (!context) {
    throw new Error(
      'usePickupDelivery must be used within a PickupDeliveryProvider',
    );
  }
  return context;
};
