'use client';

import StarFilled from '@/assets/basic-icons/star-filled-icon.svg';
import StarOutline from '@/assets/basic-icons/star-outline.svg';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import { useRestaurantsStore } from '@/providers/restaurants-store-provider';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';

const RestaurantsFilters = () => {
  const { setFilterOption } = useRestaurantsStore(state => state);
  const { rating, openNow, freeDelivery } = useRestaurantsStore(
    state => state.filterOptions,
  );

  const STAR_RATINGS = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-5">
      <ToggleSwitch
        label="Open now"
        checked={openNow}
        onChange={checked => setFilterOption('openNow', checked)}
      />
      <ToggleSwitch
        label="Free delivery"
        checked={freeDelivery}
        onChange={checked => setFilterOption('freeDelivery', checked)}
      />
      <Field className="flex flex-col gap-2">
        <Label className="select-none body1">Rating</Label>
        <RadioGroup
          value={rating}
          onChange={value => setFilterOption('rating', value)}
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
