'use client';

import type { Restaurant } from '@/components/restaurants/RestaurantInfo';
import {
  type RestaurantsStore,
  createRestaurantsStore,
} from '@/stores/restaurants-store';
import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type RestaurantsStoreApi = ReturnType<typeof createRestaurantsStore>;

export const RestaurantsStoreContext = createContext<
  RestaurantsStoreApi | undefined
>(undefined);

export interface RestaurantsStoreProviderProps {
  children: ReactNode;
  initData: Restaurant[];
}

export const RestaurantsStoreProvider = ({
  children,
  initData,
}: RestaurantsStoreProviderProps) => {
  const storeRef = useRef<RestaurantsStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createRestaurantsStore(initData); // Initialize the store with list of restaurants
  }

  return (
    <RestaurantsStoreContext.Provider value={storeRef.current}>
      {children}
    </RestaurantsStoreContext.Provider>
  );
};

export const useRestaurantsStore = <T,>(
  selector: (store: RestaurantsStore) => T,
): T => {
  const counterStoreContext = useContext(RestaurantsStoreContext);

  if (!counterStoreContext) {
    throw new Error(
      `useRestaurantsStore must be used within RestaurantsStoreProvider`,
    );
  }

  return useStore(counterStoreContext, selector);
};
