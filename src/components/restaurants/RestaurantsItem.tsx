import Link from 'next/link';
import RestaurantInfo from './RestaurantInfo';

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
      className="flex flex-col gap-4 rounded-xl bg-white shadow-lg sm:flex-row"
      href={`/restaurant/${id}`}
    >
      <div className="min-h-[104px] min-w-[184px] rounded-xl bg-gray-600 text-center">
        IMAGE
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
