'use client';

import { useSearchParams } from 'next/navigation';
import { useDeferredValue } from 'react';

import SearchIcon from '@/assets/basic-icons/search-icon.svg';
import RestaurantItem from '@/components/restaurants/RestaurantsItem';
import Button from '@/components/ui/Button';
import { processRestaurants } from '@/lib/restaurantsQuery';
import { updateQueryParam } from '@/lib/utils';
import type { Restaurant } from '@/types/restaurant';

type RestaurantsListProps = {
  restaurants: Restaurant[];
};

const RestaurantsList = ({ restaurants }: RestaurantsListProps) => {
  const searchParams = useSearchParams();

  const isOpenNow = searchParams.get('openNow') === 'true';
  const isFreeDelivery = searchParams.get('freeDelivery') === 'true';
  const rating = Number(searchParams.get('rating'));
  const sortOption = searchParams.get('sort');
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  // DeferredValue to prevent input lag on typing in input
  const defferedSearchQuery = useDeferredValue(searchQuery);

  // Process restaurants with search/filter/sort options if needed
  const processedRestaurants = processRestaurants({
    restaurants,
    searchQuery: defferedSearchQuery,
    category,
    openNow: isOpenNow,
    freeDelivery: isFreeDelivery,
    rating,
    sortOption,
  });

  if (processedRestaurants.length === 0) {
    return (
      <div className="my-10 mt-6 flex animate-appear flex-col items-center gap-5 p-2">
        {defferedSearchQuery ? (
          <>
            <SearchIcon width="100px" height="100px" />
            <h2>
              We didn&apos;t find a match for &quot;{defferedSearchQuery}&quot;
            </h2>
            <p>Try searching for something else instead</p>
            <Button onClick={() => updateQueryParam('search', '')}>
              Reset search
            </Button>
          </>
        ) : (
          <>
            <h2>We didn&apos;t find anything for your options.</h2>
            <p>Try select something else instead</p>
          </>
        )}
      </div>
    );
  }

  return (
    <main className="mt-4">
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
    </main>
  );
};

export default RestaurantsList;
