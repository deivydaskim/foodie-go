'use client';

import StarFilled from '@/assets/basic-icons/star-filled-icon.svg';
import StarOutline from '@/assets/basic-icons/star-outline.svg';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import { updateQueryParam } from '@/lib/utils';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';

const STAR_RATINGS = [1, 2, 3, 4, 5];

const RestaurantsFilters = () => {
  const searchParams = useSearchParams();

  const openNow = searchParams.get('openNow') === 'true';
  const freeDelivery = searchParams.get('freeDelivery') === 'true';
  const rating = Number(searchParams.get('rating'));

  return (
    <div className="space-y-5">
      <ToggleSwitch
        label="Open now"
        checked={openNow}
        onChange={checked => updateQueryParam('openNow', checked)}
      />
      <ToggleSwitch
        label="Free delivery"
        checked={freeDelivery}
        onChange={checked => updateQueryParam('freeDelivery', checked)}
      />
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
