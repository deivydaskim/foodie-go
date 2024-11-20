import FoodFilterSlider from '@/components/food-filter-slider/FoodFilterSlider';
import RestaurantsSearch from '@/components/restaurants-filter/RestaurantsSearch';
import RestaurantsSortBy from '@/components/restaurants-filter/RestaurantsSortBy';
import { foodList } from '@/lib/foodItems';

export default function Home() {
  return (
    <div className="m-auto max-w-screen-lg px-10">
      <FoodFilterSlider foods={foodList} />
      <div className="grid min-h-screen grid-cols-[1fr_3fr] gap-2 rounded-xl bg-gray-100 p-4">
        <aside className="bg-white">Sidebar for sort</aside>
        <div className="flex flex-col gap-2">
          <section className="flex items-center justify-between gap-4 bg-white">
            <div className="basis-2/3">
              <RestaurantsSearch />
            </div>
            <div className="basis-1/3">
              <RestaurantsSortBy />
            </div>
          </section>
          <main className="bg-white">Restaurants list</main>
        </div>
      </div>
    </div>
  );
}
