import RestaurantInfo from './RestaurantInfo';

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

type RestaurantsItemProps = {
  restaurant: Restaurant;
};

const RestaurantsItem = ({ restaurant }: RestaurantsItemProps) => {
  return (
    <article
      key={restaurant.id}
      className="flex flex-col gap-4 rounded-xl bg-white shadow-lg sm:flex-row"
    >
      <div className="min-h-[104px] min-w-[184px] rounded-xl bg-gray-600 text-center">
        IMAGE
      </div>
      <RestaurantInfo
        name={restaurant.name}
        categories={restaurant.categories}
        address={restaurant.address}
        deliveryFee={restaurant.deliveryFee}
        distance={restaurant.distance}
        numberOfReviews={restaurant.numberOfReviews}
        rating={restaurant.rating}
      />
    </article>
  );
};

export default RestaurantsItem;
