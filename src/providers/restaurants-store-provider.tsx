'use client';

import type { RestaurantsState } from '@/stores/restaurants-store';
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
  initData: RestaurantsState; // Accept initData prop
}

export const RestaurantsStoreProvider = ({
  children,
  initData = { restaurants: [] }, // Default to an empty list if no initData is provided
}: RestaurantsStoreProviderProps) => {
  const storeRef = useRef<RestaurantsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createRestaurantsStore(initData); // Initialize the store with
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
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
