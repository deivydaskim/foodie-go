'use client';

import ArrowDownIcon from '@/assets/basic-icons/arrow-down-icon.svg';
import Button from '@/components/ui/Button';
import PopupButton from '@/components/ui/PopupButton';
import useIsMobileScreen from '@/hooks/useIsMobileScreen';
import { CloseButton, Label, Radio, RadioGroup } from '@headlessui/react';
import { useState } from 'react';

const sortOptions = [
  'Recommended',
  'Alphabet order (A-Z)',
  'Alphabet order (Z-A)',
  'Distance',
];

const RestaurantsSortBy = () => {
  const [selectedSort, setSelectedSort] = useState<string>(sortOptions[0]);

  const [tempSort, setTempSort] = useState<string>(selectedSort);

  const isMobile = useIsMobileScreen();

  const sortButton = (
    <Button
      variant="secondary"
      className="flex w-full items-center justify-between bg-blueGray-100 subtitle1"
    >
      {selectedSort}
      <ArrowDownIcon className="transition-transform group-data-[open]:-rotate-180" />
    </Button>
  );

  const anchorPos = isMobile ? 'bottom' : 'bottom end';

  return (
    <PopupButton anchor={anchorPos} button={sortButton}>
      <div className="flex flex-col gap-3 p-6">
        <h4 className="header4">Sort by</h4>
        <RadioGroup value={tempSort} onChange={setTempSort}>
          {sortOptions.map(option => (
            <Radio
              key={option}
              value={option}
              className="group flex cursor-pointer items-center gap-2 border-b-2 px-1 py-3 body2 last:border-b-0"
            >
              <span className="h-4 w-4 rounded-full border-2 border-black group-data-[checked]:border-[5px]" />
              <Label>{option}</Label>
            </Radio>
          ))}
        </RadioGroup>
        <div className="flex justify-end gap-2">
          <CloseButton as="div">
            <Button
              onClick={() => setTempSort(selectedSort)}
              variant="secondary"
            >
              Cancel
            </Button>
          </CloseButton>
          <CloseButton as="div">
            <Button onClick={() => setSelectedSort(tempSort)}>Apply</Button>
          </CloseButton>
        </div>
      </div>
    </PopupButton>
  );
};

export default RestaurantsSortBy;
