'use client';

import { createContext, useContext, useState } from 'react';

type FilteredRestaurantsContextType = {
  filteredCount: number;
  setFilteredCount: (count: number) => void;
};

const FilteredRestaurantsContext = createContext<
  FilteredRestaurantsContextType | undefined
>(undefined);

export const FilteredRestaurantsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filteredCount, setFilteredCount] = useState<number>(0);

  return (
    <FilteredRestaurantsContext.Provider
      value={{ filteredCount, setFilteredCount }}
    >
      {children}
    </FilteredRestaurantsContext.Provider>
  );
};

export const useFilteredRestaurants = () => {
  const context = useContext(FilteredRestaurantsContext);
  if (!context) {
    throw new Error(
      'useFilteredRestaurants must be used within a FilteredRestaurantsProvider',
    );
  }
  return context;
};
