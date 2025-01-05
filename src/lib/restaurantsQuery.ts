import type { Restaurant } from '@/types/restaurant';

export const searchRestaurants = (
  restaurants: Restaurant[],
  searchQuery: string | null,
): Restaurant[] => {
  const lowercasedQuery = searchQuery!.toLowerCase();

  return restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(lowercasedQuery),
  );
};

export const filterRestaurants = (
  restaurants: Restaurant[],
  openNow?: boolean,
  freeDelivery?: boolean,
  rating?: number,
  category?: string | null,
): Restaurant[] => {
  return restaurants.filter(restaurant => {
    if (openNow && !restaurant.isOpen) {
      return false;
    }
    if (freeDelivery && restaurant.deliveryFee !== 0) {
      return false;
    }
    if (rating && rating > 0 && restaurant.rating < rating) {
      return false;
    }
    if (category && !restaurant.categories.includes(category)) {
      return false;
    }
    return true;
  });
};

export const sortRestaurants = (
  restaurants: Restaurant[],
  sortOption: string | null,
): Restaurant[] => {
  return [...restaurants].sort((a, b) => {
    switch (sortOption) {
      case 'Alphabet order (A-Z)':
        return a.name.localeCompare(b.name);
      case 'Alphabet order (Z-A)':
        return b.name.localeCompare(a.name);
      case 'Distance':
        return a.distance - b.distance;
      default:
        return 0;
    }
  });
};

export const processRestaurants = ({
  restaurants,
  searchQuery,
  category,
  openNow,
  freeDelivery,
  rating,
  sortOption,
}: {
  restaurants: Restaurant[];
  searchQuery?: string | null;
  category?: string | null;
  openNow?: boolean;
  freeDelivery?: boolean;
  rating?: number;
  sortOption?: string | null;
}): Restaurant[] => {
  let processedRestaurants = restaurants;

  if (searchQuery) {
    processedRestaurants = searchRestaurants(processedRestaurants, searchQuery);
  }

  if (openNow || freeDelivery || (rating && rating > 0) || category) {
    processedRestaurants = filterRestaurants(
      processedRestaurants,
      openNow,
      freeDelivery,
      rating,
      category,
    );
  }

  if (sortOption) {
    processedRestaurants = sortRestaurants(processedRestaurants, sortOption);
  }

  return processedRestaurants;
};
