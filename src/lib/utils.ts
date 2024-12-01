export const calculateDeliveryTime = (distance: number) => {
  const BASE_TIME = 10;
  const TIME_FOR_KM = 5;
  const POSSIBLE_DELAY = 10;

  const totalTime = Math.round(distance) * TIME_FOR_KM + BASE_TIME;

  return [totalTime, totalTime + POSSIBLE_DELAY];
};
