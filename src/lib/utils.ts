export const formatPrice = (
  amount: number,
  currency = 'USD',
  locale = 'en-US',
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

// Dummy function
export const calculateDeliveryTime = (distance: number) => {
  const BASE_TIME = 10;
  const TIME_FOR_KM = 5;
  const POSSIBLE_DELAY = 10;

  const deliveryTime = Math.round(distance) * TIME_FOR_KM + BASE_TIME;
  const deliveryTimeWithDelay = deliveryTime + POSSIBLE_DELAY;

  return { deliveryTime, deliveryTimeWithDelay };
};

export const capitalizeEachWord = (str: string) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Update url params without reload/request
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
