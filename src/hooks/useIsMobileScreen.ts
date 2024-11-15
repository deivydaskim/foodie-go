import { useEffect, useState } from 'react';

const useIsMobileScreen = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 640px)');
    const updateIsMobile = () => setIsMobile(mediaQueryList.matches);

    // Init
    updateIsMobile();

    mediaQueryList.addEventListener('change', updateIsMobile);

    return () => mediaQueryList.removeEventListener('change', updateIsMobile);
  }, []);

  return isMobile;
};

export default useIsMobileScreen;
