import FoodFilterSlider from '@/components/food-filter-slider/FoodFilterSlider';
import { foodList } from '@/lib/foodItems';

export default function Home() {
  return (
    <main className="m-auto max-w-screen-lg px-10">
      <FoodFilterSlider foods={foodList} />
    </main>
  );
}
