'use client';

import { useRestaurantsStore } from '@/app/restaurantsStore';
import { useEffect } from 'react';
import type { Restaurant } from './RestaurantInfo';
import RestaurantInfo from './RestaurantInfo';

type RestaurantListProps = {
  initialData: Restaurant[];
};

const RestaurantsList = ({ initialData }: RestaurantListProps) => {
  const { setRestaurants, filteredRestaurants, hasInteracted } =
    useRestaurantsStore();

  useEffect(() => {
    if (initialData.length > 0 && !hasInteracted) {
      console.log('SETING DATA FOR ZUSTAND');
      setRestaurants(initialData);
    }
  }, [initialData, setRestaurants, hasInteracted]);

  const renderRestaurants = (restaurants: Restaurant[]) => {
    return (
      <div className="flex flex-col gap-4 pt-4">
        <h2>Order from {restaurants.length} places</h2>
        {restaurants.map(restaurant => (
          <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    );
  };

  // Check if the user hasnt made any filter/search/sort send SSR initial data
  // Might need different solution for this one
  if (!hasInteracted) {
    return renderRestaurants(initialData);
  }

  if (filteredRestaurants.length === 0) {
    return <div>No restaurants found.</div>;
  }

  return renderRestaurants(filteredRestaurants);
};

export default RestaurantsList;
