'use client';

import FilterIcon from '@/assets/basic-icons/filter-icon.svg';
import Drawer from '@/components/ui//Drawer';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import RestaurantsFilters from './RestaurantsFilters';
import RestaurantsSortBy from './RestaurantsSortBy';

const MobileFilterMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
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
            <Button className="w-full shrink-0">46 Places</Button>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default MobileFilterMenu;
