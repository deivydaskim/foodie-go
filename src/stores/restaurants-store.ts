import type { Restaurant } from '@/components/restaurants/RestaurantInfo';
import { createStore } from 'zustand/vanilla';

type FilterOptions = {
  searchQuery: string;
  openNow: boolean;
  freeDelivery: boolean;
  rating: number;
};

type RestaurantsState = {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  sortOption: SortOption;
  filterOptions: FilterOptions;
};

type RestaurantsActions = {
  setSortOption: (sortOption: SortOption) => void;
  setFilterOption: <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K],
  ) => void;
  updateFilteredRestaurants: () => void;
};

export type SortOption = (typeof SORT_OPTIONS)[number];

export const SORT_OPTIONS = [
  'Recommended',
  'Alphabet order (A-Z)',
  'Alphabet order (Z-A)',
  'Distance',
] as const;

const filterRestaurants = (
  restaurants: Restaurant[],
  filterOptions: FilterOptions,
): Restaurant[] => {
  return restaurants.filter(restaurant => {
    if (
      filterOptions.searchQuery &&
      !restaurant.name
        .toLowerCase()
        .includes(filterOptions.searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (filterOptions.openNow && !restaurant.isOpen) {
      return false;
    }
    if (filterOptions.freeDelivery && restaurant.deliveryFee !== 0) {
      return false;
    }
    if (filterOptions.rating > 0 && restaurant.rating < filterOptions.rating) {
      return false;
    }
    return true;
  });
};

const sortRestaurants = (
  restaurants: Restaurant[],
  sortOption: SortOption,
): Restaurant[] => {
  switch (sortOption) {
    case 'Alphabet order (A-Z)':
      return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
    case 'Alphabet order (Z-A)':
      return [...restaurants].sort((a, b) => b.name.localeCompare(a.name));
    case 'Distance':
      return [...restaurants].sort((a, b) => a.distance - b.distance);
    default:
      return restaurants;
  }
};

export type RestaurantsStore = RestaurantsState & RestaurantsActions;

export const createRestaurantsStore = (initState: Restaurant[] = []) => {
  return createStore<RestaurantsStore>()((set, get) => ({
    restaurants: initState,
    filteredRestaurants: initState,
    sortOption: SORT_OPTIONS[0],
    filterOptions: {
      searchQuery: '',
      openNow: false,
      freeDelivery: false,
      rating: 0,
    },

    setSortOption: (sortOption: SortOption) => {
      set({ sortOption });
      get().updateFilteredRestaurants();
    },

    setFilterOption: <K extends keyof FilterOptions>(
      key: K,
      value: FilterOptions[K],
    ) => {
      set(state => ({
        filterOptions: {
          ...state.filterOptions,
          [key]: value,
        },
      }));
      get().updateFilteredRestaurants();
    },

    updateFilteredRestaurants: () => {
      const { restaurants, filterOptions, sortOption } = get();
      const filtered = filterRestaurants(restaurants, filterOptions);
      const sorted = sortRestaurants(filtered, sortOption);
      set({ filteredRestaurants: sorted });
    },
  }));
};
