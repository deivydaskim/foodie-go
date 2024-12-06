'use client';

import { useFilteredRestaurants } from '@/context/FilteredRestaurantsContext';
import {
  filterByCategory,
  filterRestaurants,
  searchRestaurants,
  sortRestaurants,
} from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useDeferredValue, useEffect } from 'react';
import EmptyList from './EmptyList';
import type { FoodCategories, Restaurant } from './RestaurantInfo';
import RestaurantInfo from './RestaurantInfo';

type RestaurantsListProps = {
  restaurants: Restaurant[];
};

const RestaurantsList = ({ restaurants }: RestaurantsListProps) => {
  const searchParams = useSearchParams();
  const { setFilteredCount } = useFilteredRestaurants();

  const openNow = searchParams.get('openNow') === 'true';
  const freeDelivery = searchParams.get('freeDelivery') === 'true';
  const rating = Number(searchParams.get('rating'));
  const sortOption = searchParams.get('sort');
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  // Could use useDeferredValue for all params to avoid UI/input lag for long renderings, but its fine for now
  const deferredSearchQuery = useDeferredValue(searchQuery);

  let processedRestaurants = restaurants;

  if (deferredSearchQuery) {
    processedRestaurants = searchRestaurants(
      processedRestaurants,
      deferredSearchQuery,
    );
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

  const isPending = searchQuery !== deferredSearchQuery;

  useEffect(() => {
    setFilteredCount(processedRestaurants.length);
  }, [processedRestaurants.length, setFilteredCount]);

  return (
    <div
      className={`relative flex flex-col gap-4 pt-4 transition-opacity ${
        isPending ? 'opacity-80' : ''
      }`}
    >
      {processedRestaurants.length === 0 ? (
        <EmptyList searchQuery={deferredSearchQuery} />
      ) : (
        <>
          <h2>Order from {processedRestaurants.length} places</h2>
          {processedRestaurants.map(restaurant => (
            <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
          ))}
        </>
      )}
    </div>
  );
};

export default RestaurantsList;
