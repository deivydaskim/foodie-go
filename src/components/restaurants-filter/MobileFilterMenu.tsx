'use client';

import FilterIcon from '@/assets/basic-icons/filter-icon.svg';
import Button from '@/components/ui/Button';
import Drawer from '@/components/ui/Drawer';
import { useFilteredRestaurants } from '@/context/FilteredRestaurantsContext';
import { useState } from 'react';
import RestaurantsFilters from './RestaurantsFilters';
import RestaurantsSortBy from './RestaurantsSortBy';

const MobileFilterMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { filteredCount } = useFilteredRestaurants();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="sm:hidden">
      <Button
        onClick={openDrawer}
        variant="rounded"
        className="bg-blueGray-100"
      >
        <FilterIcon />
      </Button>
      {isDrawerOpen && (
        <Drawer title="Filter" onClose={closeDrawer}>
          <div className="flex h-full flex-col gap-6">
            <div className="flex-grow space-y-4">
              <RestaurantsSortBy />
              <RestaurantsFilters />
            </div>
            <Button onClick={closeDrawer} className="w-full shrink-0">
              {filteredCount} Places
            </Button>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default MobileFilterMenu;
