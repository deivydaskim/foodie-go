'use client';

import type { Restaurant } from '@/components/restaurants/RestaurantInfo';
import { create } from 'zustand';

type RestaurantsStore = {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  sortOption: string;
  searchQuery: string;
  openNow: boolean;
  freeDelivery: boolean;
  rating: number;
  hasInteracted: boolean;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setSortOption: (sortOption: string) => void;
  setSearchQuery: (query: string) => void;
  setOpenNow: (openNow: boolean) => void;
  setFreeDelivery: (freeDelivery: boolean) => void;
  setRating: (rating: number) => void;
  setHasInteracted: (hasInteracted: boolean) => void;
  updateFilteredRestaurants: () => void;
};

// Filtering function
const filterRestaurants = (
  restaurants: Restaurant[],
  searchQuery: string,
  openNow: boolean,
  freeDelivery: boolean,
  rating: number,
): Restaurant[] => {
  return restaurants.filter(restaurant => {
    if (
      searchQuery &&
      !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (openNow && !restaurant.isOpen) {
      return false;
    }
    if (freeDelivery && restaurant.deliveryFee > 0) {
      return false;
    }
    if (rating > 0 && restaurant.rating < rating) {
      return false;
    }
    return true;
  });
};

// Sorting function
const sortRestaurants = (
  restaurants: Restaurant[],
  sortOption: string,
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

export const useRestaurantsStore = create<RestaurantsStore>((set, get) => ({
  restaurants: [],
  filteredRestaurants: [],
  sortOption: 'Recommended',
  searchQuery: '',
  openNow: false,
  freeDelivery: false,
  rating: 0,
  hasInteracted: false,

  setRestaurants: (restaurants: Restaurant[]) => {
    set({ restaurants, filteredRestaurants: restaurants });
  },

  setSortOption: (sortOption: string) => {
    set({ sortOption, hasInteracted: true });
    get().updateFilteredRestaurants();
  },

  setSearchQuery: (searchQuery: string) => {
    set({ searchQuery, hasInteracted: true });
    get().updateFilteredRestaurants();
  },

  setOpenNow: (openNow: boolean) => {
    set({ openNow, hasInteracted: true });
    get().updateFilteredRestaurants();
  },

  setFreeDelivery: (freeDelivery: boolean) => {
    set({ freeDelivery, hasInteracted: true });
    get().updateFilteredRestaurants();
  },

  setRating: (rating: number) => {
    set({ rating, hasInteracted: true });
    get().updateFilteredRestaurants();
  },

  updateFilteredRestaurants: () => {
    const {
      restaurants,
      searchQuery,
      openNow,
      freeDelivery,
      rating,
      sortOption,
    } = get();
    const filtered = filterRestaurants(
      restaurants,
      searchQuery,
      openNow,
      freeDelivery,
      rating,
    );
    const sorted = sortRestaurants(filtered, sortOption);
    set({ filteredRestaurants: sorted });
  },

  setHasInteracted: (hasInteracted: boolean) => set({ hasInteracted }),
}));
