import DeliveryIcon from '@/assets/basic-icons/delivery-icon.svg';
import StarIcon from '@/assets/basic-icons/star-filled-icon.svg';
import TimeIcon from '@/assets/basic-icons/time.svg';
import { calculateDeliveryTime } from '@/lib/utils';
import InfoItem from './InfoItem';

type Dish = {
  title: string;
  price: number;
  description: string;
  id: string;
};

type Menu = {
  popular: Dish[];
  lunch: Dish[];
  appetizers: Dish[];
  entrees: Dish[];
  sides: Dish[];
  specialties: Dish[];
  chefsPicks: Dish[];
};

export type FoodCategories =
  | 'Asian'
  | 'Breakfast'
  | 'Burger'
  | 'Dessert'
  | 'Fast Food'
  | 'Healthy'
  | 'Ice Cream'
  | 'Indian'
  | 'Italian'
  | 'Korean'
  | 'Pizza'
  | 'Seafood'
  | 'Sushi'
  | 'Vegan';

export type Restaurant = {
  id: number;
  name: string;
  categories: FoodCategories[];
  rating: number;
  numberOfReviews: number;
  distance: number;
  address: string;
  deliveryFee: number;
  isOpen: boolean;
  menu: Menu;
};

type RestaurantInfoProps = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  const [deliveryTime, delayedDeliveryTime] = calculateDeliveryTime(
    restaurant.distance,
  );

  return (
    <article
      key={restaurant.id}
      className="flex flex-col rounded-xl bg-white shadow-lg sm:flex-row"
    >
      <div className="min-h-[104px] min-w-[184px] rounded-xl bg-gray-600 text-center">
        IMAGE
      </div>
      <div className="flex flex-col justify-between gap-1 p-3">
        <h3 className="text-lg font-semibold capitalize header3">
          {restaurant.name}
        </h3>
        <p className="text-gray-400 subtitle1">
          {restaurant.categories.join(', ')}
        </p>
        <div className="flex flex-wrap gap-2 text-center subtitle1">
          <InfoItem icon={<StarIcon />}>
            {`${restaurant.rating} (${restaurant.numberOfReviews}+)`}
          </InfoItem>
          <span>•</span>
          <InfoItem icon={<TimeIcon />}>
            {`${deliveryTime}-${delayedDeliveryTime} min`}
          </InfoItem>
          <span>•</span>
          <InfoItem icon={<DeliveryIcon />}>
            {restaurant.deliveryFee === 0 ? (
              <span className="text-green">Free</span>
            ) : (
              `$ ${restaurant.deliveryFee.toFixed(2)}`
            )}
          </InfoItem>
        </div>
      </div>
    </article>
  );
};

export default RestaurantInfo;
