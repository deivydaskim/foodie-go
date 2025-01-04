export type Dish = {
  title: string;
  price: number;
  description: string;
  id: string;
};

export type Menu = {
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
