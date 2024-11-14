import { useSyncExternalStore } from 'react';

const getIsMobile = () => window.matchMedia('(max-width: 640px)').matches;

const subscribeToMediaQuery = (callback: () => void) => {
  const mediaQueryList = window.matchMedia('(max-width: 640px)');
  mediaQueryList.addEventListener('change', callback);
  return () => mediaQueryList.removeEventListener('change', callback);
};

const useIsMobileScreen = () =>
  useSyncExternalStore(subscribeToMediaQuery, getIsMobile);

export default useIsMobileScreen;
