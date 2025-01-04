'use client';

import LocationIcon from '@/assets/basic-icons/adress.svg';
import DeliveryIcon from '@/assets/basic-icons/delivery-icon.svg';
import DistanceIcon from '@/assets/basic-icons/distance-icon.svg';
import StarIcon from '@/assets/basic-icons/star-filled-icon.svg';
import TimeIcon from '@/assets/basic-icons/time.svg';
import MetricsItem from '@/components/restaurants/MetricsItem';
import { usePickupDelivery } from '@/context/PickupDeliveryContext';
import { calculateDeliveryTime, formatPrice } from '@/lib/utils';
import { Restaurant } from '@/types/restaurant';

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

  const formattedCategories = categories.join(', ');

  return (
    <div className="flex flex-col justify-between gap-2 px-2 py-3 sm:px-0">
      <h3 className="text-lg font-semibold capitalize">{name}</h3>
      <p className="text-gray-400 subtitle1">{formattedCategories}</p>
      <div className="flex flex-wrap gap-2 text-center subtitle1 [&>*:not(:last-child)]:after:content-['•']">
        <MetricsItem icon={<StarIcon />}>
          {`${rating} (${numberOfReviews}+)`}
        </MetricsItem>

        {isPickup ? (
          <MetricsItem icon={<DistanceIcon />}>{`${distance} km`}</MetricsItem>
        ) : (
          <MetricsItem icon={<TimeIcon />}>
            {`${deliveryTime}-${deliveryTimeWithDelay} min`}
          </MetricsItem>
        )}

        {isPickup ? (
          <MetricsItem icon={<LocationIcon />}>{address}</MetricsItem>
        ) : (
          <MetricsItem icon={<DeliveryIcon />}>
            {deliveryFee === 0 ? (
              <span className="text-green">Free</span>
            ) : (
              formatPrice(deliveryFee)
            )}
          </MetricsItem>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;
