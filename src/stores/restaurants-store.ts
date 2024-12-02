import type { Restaurant } from '@/components/restaurants/RestaurantInfo';
import { createStore } from 'zustand/vanilla';

export type RestaurantsState = {
  restaurants: Restaurant[];
};

export type RestaurantsActions = {
  decrementCount: () => void;
};

export type RestaurantsStore = RestaurantsState & RestaurantsActions;

export const defaultInitState: RestaurantsState = {
  restaurants: [],
};

export const createRestaurantsStore = (
  initState: RestaurantsState = defaultInitState,
) => {
  return createStore<RestaurantsStore>()(set => ({
    ...initState,
    decrementCount: () =>
      set(state => ({ restaurants: (state.restaurants = []) })),
  }));
};
