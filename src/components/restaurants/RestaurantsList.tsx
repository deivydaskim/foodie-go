'use client';

import {
  filterRestaurants,
  searchRestaurants,
  sortRestaurants,
} from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import RestaurantInfo, { Restaurant } from './RestaurantInfo';

const RestaurantsList = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search');
  const openNow = searchParams.get('openNow') === 'true';
  const freeDelivery = searchParams.get('freeDelivery') === 'true';
  const rating = Number(searchParams.get('rating'));
  const sortOption = searchParams.get('sort');

  let processedRestaurants = restaurants;

  if (searchQuery) {
    processedRestaurants = searchRestaurants(processedRestaurants, searchQuery);
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

  return (
    <div className="flex flex-col gap-4 pt-4">
      <h2>Order from {processedRestaurants.length} places</h2>
      {processedRestaurants.map(restaurant => (
        <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantsList;
