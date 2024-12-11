'use client';

import { processRestaurants } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import EmptyList from './EmptyList';
import RestaurantItem from './RestaurantsItem';

type RestaurantsListProps = {
  restaurants: Restaurant[];
};

const RestaurantsList = ({ restaurants }: RestaurantsListProps) => {
  const searchParams = useSearchParams();

  const openNow = searchParams.get('openNow') === 'true';
  const freeDelivery = searchParams.get('freeDelivery') === 'true';
  const rating = Number(searchParams.get('rating'));
  const sortOption = searchParams.get('sort');
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  // Process restaurants with search/filter options if needed
  const processedRestaurants = processRestaurants({
    restaurants,
    searchQuery,
    category,
    openNow,
    freeDelivery,
    rating,
    sortOption,
  });

  return (
    <main className="mt-4">
      {processedRestaurants.length === 0 ? (
        <EmptyList searchQuery={searchQuery} />
      ) : (
        <div className="animate-appear space-y-4">
          <h2>Order from {processedRestaurants.length} places</h2>
          {processedRestaurants.map(restaurant => (
            <RestaurantItem
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              categories={restaurant.categories}
              rating={restaurant.rating}
              numberOfReviews={restaurant.numberOfReviews}
              distance={restaurant.distance}
              address={restaurant.address}
              deliveryFee={restaurant.deliveryFee}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default RestaurantsList;
