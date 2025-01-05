export type Restaurant = {
  id: number;
  name: string;
  categories: string[];
  rating: number;
  numberOfReviews: number;
  distance: number;
  address: string;
  deliveryFee: number;
  isOpen: boolean;
  menu: Menu;
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

export type Dish = {
  title: string;
  price: number;
  description: string;
  id: string;
};
