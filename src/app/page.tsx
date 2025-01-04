import FoodFilterSlider from '@/components/food-filter-slider/FoodFilterSlider';
import FiltersMenuButton from '@/components/restaurants-filter/FiltersMenuButton';
import RestaurantsFilters from '@/components/restaurants-filter/RestaurantsFilters';
import RestaurantsSearch from '@/components/restaurants-filter/RestaurantsSearch';
import RestaurantsSortBy from '@/components/restaurants-filter/RestaurantsSortBy';
import RestaurantsList from '@/components/restaurants/RestaurantsList';
import restaurantsData from '@/data/restaurants.json';
import { Restaurant } from '@/types/restaurant';

function simulateFetchData() {
  return new Promise<Restaurant[]>(resolve => {
    setTimeout(() => {
      resolve(restaurantsData as Restaurant[]);
    }, 50);
  });
}

const HomePage = async () => {
  const restaurantsData = await simulateFetchData();

  return (
    <>
      <FoodFilterSlider />
      <div className="grid grid-cols-1 gap-1 rounded-xl bg-gray-100 px-2 py-3 sm:px-4 sm:py-5 md:grid-cols-[1fr_3fr]">
        <aside className="hidden min-w-44 md:block md:px-3 lg:px-6">
          <RestaurantsFilters />
        </aside>
        <div className="flex flex-col gap-2">
          <section className="flex items-center justify-between gap-3 md:gap-6">
            <div className="basis-full md:basis-2/3">
              <RestaurantsSearch />
            </div>
            <div className="hidden basis-1/3 md:block">
              <RestaurantsSortBy />
            </div>
            <div className="md:hidden">
              <FiltersMenuButton />
            </div>
          </section>
          <RestaurantsList restaurants={restaurantsData} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
