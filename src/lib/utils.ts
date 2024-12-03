import { Restaurant } from '@/components/restaurants/RestaurantInfo';

export const calculateDeliveryTime = (distance: number) => {
  const BASE_TIME = 10;
  const TIME_FOR_KM = 5;
  const POSSIBLE_DELAY = 10;

  const totalTime = Math.round(distance) * TIME_FOR_KM + BASE_TIME;

  return [totalTime, totalTime + POSSIBLE_DELAY];
};

export const updateQueryParam = (
  key: string,
  value: string | number | boolean,
) => {
  const url = new URL(window.location.href);

  if (value === false || value === 0 || value === '' || value === null) {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, String(value));
  }

  //window.history.pushState({}, '', url.toString());
  window.history.replaceState({}, '', url.toString());
};

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
  openNow: boolean,
  freeDelivery: boolean,
  rating: number,
): Restaurant[] => {
  return restaurants.filter(restaurant => {
    if (openNow && !restaurant.isOpen) {
      return false;
    }
    if (freeDelivery && restaurant.deliveryFee !== 0) {
      return false;
    }
    if (rating > 0 && restaurant.rating < rating) {
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
