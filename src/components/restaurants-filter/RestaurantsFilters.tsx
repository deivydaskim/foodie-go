'use client';

import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import StarFilled from '@/assets/basic-icons/star-filled-icon.svg';
import StarOutline from '@/assets/basic-icons/star-outline.svg';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import { usePickupDelivery } from '@/context/PickupDeliveryContext';
import { updateQueryParam } from '@/lib/utils';

const STAR_RATINGS = [1, 2, 3, 4, 5];

const RestaurantsFilters = () => {
  const searchParams = useSearchParams();
  const { isPickup } = usePickupDelivery();

  const openNow = searchParams.get('openNow') === 'true';
  const freeDelivery = searchParams.get('freeDelivery') === 'true';
  const rating = Number(searchParams.get('rating'));

  // Remove 'freeDelivery' from URL if Pickup is selected;
  useEffect(() => {
    if (isPickup && freeDelivery) {
      updateQueryParam('freeDelivery', '');
    }
  }, [isPickup, freeDelivery]);

  return (
    <div className="space-y-5">
      <ToggleSwitch
        label="Open now"
        checked={openNow}
        onChange={checked => updateQueryParam('openNow', checked)}
      />
      {!isPickup && (
        <ToggleSwitch
          label="Free delivery"
          checked={freeDelivery}
          onChange={checked => updateQueryParam('freeDelivery', checked)}
        />
      )}
      <Field className="flex flex-col gap-2">
        <Label className="select-none body1">Rating</Label>
        <RadioGroup
          value={rating}
          onChange={value => updateQueryParam('rating', value)}
          className="flex"
        >
          {STAR_RATINGS.map(star => (
            <Radio key={star} value={star} className="cursor-pointer">
              {star <= rating ? (
                <StarFilled className="text-green" />
              ) : (
                <StarOutline className="text-green" />
              )}
            </Radio>
          ))}
        </RadioGroup>
      </Field>
    </div>
  );
};

export default RestaurantsFilters;
