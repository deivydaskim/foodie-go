'use client';

import StarFilled from '@/assets/basic-icons/star-filled-icon.svg';
import StarOutline from '@/assets/basic-icons/star-outline.svg';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { useState } from 'react';

const RestaurantsFilters = () => {
  const [openNow, setOpenNow] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const STAR_RATINGS = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-5">
      <ToggleSwitch label="Open now" checked={openNow} onChange={setOpenNow} />
      <ToggleSwitch
        label="Free delivery"
        checked={freeDelivery}
        onChange={setFreeDelivery}
      />
      <Field className="flex flex-col gap-2">
        <Label className="select-none body1">Rating</Label>
        <RadioGroup
          value={rating}
          onChange={handleRatingChange}
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
