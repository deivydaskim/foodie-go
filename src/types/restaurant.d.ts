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

type FoodCategories =
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

type Restaurant = {
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
