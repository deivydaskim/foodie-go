'use client';

import {
  filterByCategory,
  filterRestaurants,
  searchRestaurants,
  sortRestaurants,
} from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useDeferredValue } from 'react';
import type { FoodCategories, Restaurant } from './RestaurantInfo';
import RestaurantInfo from './RestaurantInfo';

type RestaurantsListProps = {
  restaurants: Restaurant[];
};

const RestaurantsList = ({ restaurants }: RestaurantsListProps) => {
  const searchParams = useSearchParams();

  const params = {
    searchQuery: searchParams.get('search'),
    openNow: searchParams.get('openNow') === 'true',
    freeDelivery: searchParams.get('freeDelivery') === 'true',
    rating: Number(searchParams.get('rating')),
    sortOption: searchParams.get('sort'),
    category: searchParams.get('category'),
  };

  const { freeDelivery, openNow, rating, searchQuery, sortOption, category } =
    useDeferredValue(params);

  let processedRestaurants = restaurants;

  if (searchQuery) {
    processedRestaurants = searchRestaurants(processedRestaurants, searchQuery);
  }

  if (category) {
    processedRestaurants = filterByCategory(
      processedRestaurants,
      category as FoodCategories,
    );
  }

  if (openNow || freeDelivery || rating > 0) {
    processedRestaurants = filterRestaurants(
      processedRestaurants,
      openNow,
      freeDelivery,
      rating,
    );
  }

  if (sortOption) {
    processedRestaurants = sortRestaurants(processedRestaurants, sortOption);
  }

  const isPending =
    params.searchQuery !== searchQuery ||
    params.openNow !== openNow ||
    params.freeDelivery !== freeDelivery ||
    params.rating !== rating ||
    params.sortOption !== sortOption ||
    params.category !== category;

  return (
    <div
      className={`relative flex flex-col gap-4 pt-4 transition-opacity duration-300 ${
        isPending ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <h2>Order from {processedRestaurants.length} places</h2>
      {processedRestaurants.map(restaurant => (
        <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantsList;