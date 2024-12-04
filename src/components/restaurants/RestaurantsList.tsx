'use client';

import {
  filterRestaurants,
  searchRestaurants,
  sortRestaurants,
} from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useDeferredValue } from 'react';
import type { Restaurant } from './RestaurantInfo';
import RestaurantInfo from './RestaurantInfo';

const RestaurantsList = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const searchParams = useSearchParams();

  const params = {
    searchQuery: searchParams.get('search') || '',
    openNow: searchParams.get('openNow') === 'true',
    freeDelivery: searchParams.get('freeDelivery') === 'true',
    rating: Number(searchParams.get('rating')) || 0,
    sortOption: searchParams.get('sort') || '',
  };

  const deferredParams = useDeferredValue(params);

  const isPending =
    params.searchQuery !== deferredParams.searchQuery ||
    params.openNow !== deferredParams.openNow ||
    params.freeDelivery !== deferredParams.freeDelivery ||
    params.rating !== deferredParams.rating ||
    params.sortOption !== deferredParams.sortOption;

  let processedRestaurants = restaurants;

  if (deferredParams.searchQuery) {
    processedRestaurants = searchRestaurants(
      processedRestaurants,
      deferredParams.searchQuery,
    );
  }

  if (
    deferredParams.openNow ||
    deferredParams.freeDelivery ||
    deferredParams.rating > 0
  ) {
    processedRestaurants = filterRestaurants(
      processedRestaurants,
      deferredParams.openNow,
      deferredParams.freeDelivery,
      deferredParams.rating,
    );
  }

  if (deferredParams.sortOption) {
    processedRestaurants = sortRestaurants(
      processedRestaurants,
      deferredParams.sortOption,
    );
  }

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
