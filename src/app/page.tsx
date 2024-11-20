import FoodFilterSlider from '@/components/food-filter-slider/FoodFilterSlider';
import RestaurantsFilters from '@/components/restaurants-filter/RestaurantsFilters';
import RestaurantsSearch from '@/components/restaurants-filter/RestaurantsSearch';
import RestaurantsSortBy from '@/components/restaurants-filter/RestaurantsSortBy';
import { foodList } from '@/lib/foodItems';

export default function Home() {
  return (
    <div className="m-auto max-w-[1168px] px-10">
      <FoodFilterSlider foods={foodList} />
      <div className="grid min-h-screen grid-cols-1 rounded-xl bg-gray-100 px-4 py-8 md:grid-cols-[1fr_3fr]">
        <aside className="hidden min-w-40 md:block md:px-3 lg:px-6">
          <RestaurantsFilters />
        </aside>
        <div className="flex flex-col gap-2">
          <section className="flex items-center justify-between gap-6">
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
