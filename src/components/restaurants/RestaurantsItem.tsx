import Image from 'next/image';
import Link from 'next/link';

import testRestaurantImage from '@/assets/images/pexels-brett-sayles-1322184.jpg';
import RestaurantInfo from '@/components/restaurants/RestaurantInfo';
import type { Restaurant } from '@/types/restaurant';

type RestaurantsItemProps = Pick<
  Restaurant,
  | 'id'
  | 'name'
  | 'categories'
  | 'rating'
  | 'numberOfReviews'
  | 'distance'
  | 'address'
  | 'deliveryFee'
>;

const RestaurantsItem = ({
  id,
  name,
  categories,
  rating,
  numberOfReviews,
  distance,
  address,
  deliveryFee,
}: RestaurantsItemProps) => {
  return (
    <Link
      className="flex flex-col gap-1 rounded-xl bg-white shadow-lg sm:flex-row sm:gap-4"
      href={`/restaurant/${id}`}
    >
      <div className="h-28 w-full shrink-0 rounded-se-lg text-center sm:h-auto sm:w-40 sm:rounded-xl">
        <Image
          placeholder="blur"
          priority
          className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover sm:rounded-xl"
          src={testRestaurantImage}
          alt={name}
          width={300}
        />
      </div>
      <RestaurantInfo
        name={name}
        categories={categories}
        address={address}
        deliveryFee={deliveryFee}
        distance={distance}
        numberOfReviews={numberOfReviews}
        rating={rating}
      />
    </Link>
  );
};

export default RestaurantsItem;
