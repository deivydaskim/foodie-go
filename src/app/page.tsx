import FoodFilterSlider from '@/components/FoodFilterSlider/FoodFilterSlider';
import { foodList } from '@/lib/foodItems';

export default function Home() {
  return (
    <div className="m-auto max-w-screen-lg px-10">
      <FoodFilterSlider foods={foodList} />
    </div>
  );
}
