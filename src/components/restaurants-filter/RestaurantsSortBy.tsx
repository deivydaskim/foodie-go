'use client';

import { CloseButton, Label, Radio, RadioGroup } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import ArrowDownIcon from '@/assets/basic-icons/arrow-down-icon.svg';
import Button from '@/components/ui/Button';
import PopupButton from '@/components/ui/PopupButton';
import useIsMobileScreen from '@/hooks/useIsMobileScreen';
import { updateQueryParam } from '@/lib/utils';

const SORT_OPTIONS = [
  'Recommended',
  'Alphabet order (A-Z)',
  'Alphabet order (Z-A)',
  'Distance',
];

const RestaurantsSortBy = () => {
  const isMobile = useIsMobileScreen();
  const searchParams = useSearchParams();

  const sortParams = searchParams.get('sort') || SORT_OPTIONS[0];
  const [tempSort, setTempSort] = useState<string>(sortParams);

  const updateSortOption = (value: string) => updateQueryParam('sort', value);

  const sortButton = (
    <Button
      variant="secondary"
      className="flex w-full items-center justify-between bg-blueGray-100 subtitle1"
    >
      {sortParams}
      <ArrowDownIcon className="transition-transform group-data-[open]:-rotate-180" />
    </Button>
  );

  return (
    <PopupButton
      anchor={isMobile ? 'bottom' : 'bottom end'}
      button={sortButton}
    >
      <div className="flex flex-col gap-3 p-6">
        <h4>Sort by</h4>
        <RadioGroup value={tempSort} onChange={setTempSort}>
          {SORT_OPTIONS.map(option => (
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
              onClick={() => setTempSort(sortParams)} // Reset to current URL state
              variant="secondary"
            >
              Cancel
            </Button>
          </CloseButton>
          <CloseButton as="div">
            <Button
              onClick={() => {
                updateSortOption(tempSort);
              }}
            >
              Apply
            </Button>
          </CloseButton>
        </div>
      </div>
    </PopupButton>
  );
};

export default RestaurantsSortBy;
