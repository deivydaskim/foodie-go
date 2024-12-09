'use client';

import LocationIcon from '@/assets/basic-icons/adress.svg';
import DeliveryIcon from '@/assets/basic-icons/delivery-icon.svg';
import DistanceIcon from '@/assets/basic-icons/distance-icon.svg';
import StarIcon from '@/assets/basic-icons/star-filled-icon.svg';
import TimeIcon from '@/assets/basic-icons/time.svg';
import { usePickupDelivery } from '@/context/PickupDeliveryContext';
import { calculateDeliveryTime } from '@/lib/utils';
import InfoItem from './InfoItem';

type RestaurantInfoProps = Pick<
  Restaurant,
  | 'rating'
  | 'numberOfReviews'
  | 'distance'
  | 'address'
  | 'deliveryFee'
  | 'categories'
  | 'name'
>;

const RestaurantInfo = ({
  rating,
  numberOfReviews,
  distance,
  address,
  deliveryFee,
  name,
  categories,
}: RestaurantInfoProps) => {
  const { deliveryTime, deliveryTimeWithDelay } =
    calculateDeliveryTime(distance);

  const { isPickup } = usePickupDelivery();

  return (
    <div className="flex flex-col justify-between gap-2 py-3">
      <h3 className="text-lg font-semibold capitalize">{name}</h3>
      <p className="text-gray-400 subtitle1">{categories.join(', ')}</p>
      <div className="flex flex-wrap gap-2 text-center subtitle1">
        <InfoItem icon={<StarIcon />}>
          {`${rating} (${numberOfReviews}+)`}
        </InfoItem>
        <span>•</span>
        {isPickup ? (
          <InfoItem icon={<DistanceIcon />}>{`${distance} km`}</InfoItem>
        ) : (
          <InfoItem icon={<TimeIcon />}>
            {`${deliveryTime}-${deliveryTimeWithDelay} min`}
          </InfoItem>
        )}
        <span>•</span>
        {isPickup ? (
          <InfoItem icon={<LocationIcon />}>{address}</InfoItem>
        ) : (
          <InfoItem icon={<DeliveryIcon />}>
            {deliveryFee === 0 ? (
              <span className="text-green">Free</span>
            ) : (
              `$ ${deliveryFee.toFixed(2)}`
            )}
          </InfoItem>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;
