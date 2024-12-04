import Asian from '@/assets/food-icons/asian-icon.svg';
import Breakfast from '@/assets/food-icons/breakfast-icon.svg';
import Burger from '@/assets/food-icons/burger-icon.svg';
import Dessert from '@/assets/food-icons/dessert-icon.svg';
import FastFood from '@/assets/food-icons/fast-food-icon.svg';
import Healthy from '@/assets/food-icons/healthy-icon.svg';
import IceCream from '@/assets/food-icons/ice-cream-icon.svg';
import Indian from '@/assets/food-icons/indian-icon.svg';
import Italian from '@/assets/food-icons/italian-icon.svg';
import Korean from '@/assets/food-icons/korean-icon.svg';
import Pizza from '@/assets/food-icons/pizza-icon.svg';
import SeaFood from '@/assets/food-icons/seafood-icon.svg';
import Sushi from '@/assets/food-icons/sushi-icon.svg';
import Vegan from '@/assets/food-icons/vegan-icon.svg';

export type Category = {
  title: string;
  icon: JSX.Element;
};

export const foodCategories: Category[] = [
  { title: 'Breakfast', icon: <Breakfast /> },
  { title: 'Pizza', icon: <Pizza /> },
  { title: 'Sushi', icon: <Sushi /> },
  { title: 'Italian', icon: <Italian /> },
  { title: 'Indian', icon: <Indian /> },
  { title: 'Burgers', icon: <Burger /> },
  { title: 'Fast Food', icon: <FastFood /> },
  { title: 'Korean', icon: <Korean /> },
  { title: 'Asian', icon: <Asian /> },
  { title: 'Healthy', icon: <Healthy /> },
  { title: 'Vegan', icon: <Vegan /> },
  { title: 'Desserts', icon: <Dessert /> },
  { title: 'Sea Food', icon: <SeaFood /> },
  { title: 'Ice Cream', icon: <IceCream /> },
];
