'use client';

import { useState } from 'react';

import FilterIcon from '@/assets/basic-icons/filter-icon.svg';
import RestaurantsFilters from '@/components/restaurants-filter/RestaurantsFilters';
import RestaurantsSortBy from '@/components/restaurants-filter/RestaurantsSortBy';
import Button from '@/components/ui/Button';
import Drawer from '@/components/ui/Drawer';
import PopupButton from '@/components/ui/PopupButton';
import useIsMobileScreen from '@/hooks/useIsMobileScreen';

const FiltersMenuButton = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobileScreen();

  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);

  const FiltersContent = ({ onClose }: { onClose: () => void }) => (
    <div className="flex h-full flex-col gap-6 sm:px-4 sm:py-6 md:p-0">
      <div className="flex-grow space-y-4">
        <RestaurantsSortBy />
        <RestaurantsFilters />
      </div>
      <Button onClick={onClose} className="w-full shrink-0">
        See results
      </Button>
    </div>
  );

  return isMobile ? (
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
          <FiltersContent onClose={closeDrawer} />
        </Drawer>
      )}
    </>
  ) : (
    <PopupButton
      button={
        <Button variant="rounded" className="bg-blueGray-100">
          <FilterIcon />
        </Button>
      }
    >
      {({ close }) => <FiltersContent onClose={close} />}
    </PopupButton>
  );
};

export default FiltersMenuButton;
