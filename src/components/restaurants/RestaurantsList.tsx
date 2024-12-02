'use client';

import type { Restaurant } from './RestaurantInfo';
import RestaurantInfo from './RestaurantInfo';

type RestaurantListProps = {
  initialData: Restaurant[];
};

const RestaurantsList = ({ initialData }: RestaurantListProps) => {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <h2>Order from {initialData.length} places</h2>
      {initialData.map(restaurant => (
        <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};
export default RestaurantsList;
