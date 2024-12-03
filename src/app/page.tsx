import FoodFilterSlider from '@/components/food-filter-slider/FoodFilterSlider';
import MobileFilterMenu from '@/components/restaurants-filter/MobileFilterMenu';
import RestaurantsFilters from '@/components/restaurants-filter/RestaurantsFilters';
import RestaurantsSearch from '@/components/restaurants-filter/RestaurantsSearch';
import RestaurantsSortBy from '@/components/restaurants-filter/RestaurantsSortBy';
import RestaurantsList from '@/components/restaurants/RestaurantsList';
import { foodCategories } from '@/lib/foodCategories';

const HomePage = async () => {
  const res = await fetch('http://localhost:3000/api/restaurants', {
    cache: 'force-cache',
  });
  const restaurantsData = await res.json();

  return (
    <div className="m-auto max-w-[1168px] px-3 md:px-10">
      <FoodFilterSlider categories={foodCategories} />
      <div className="grid min-h-screen grid-cols-1 gap-1 rounded-xl bg-gray-100 px-2 py-3 sm:grid-cols-[1fr_3fr] md:px-4 md:py-5">
        <aside className="hidden min-w-44 sm:block md:px-3 lg:px-6">
          <RestaurantsFilters />
        </aside>
        <div className="flex flex-col gap-2">
          <section className="flex items-center justify-between gap-3 md:gap-6">
            <div className="basis-full md:basis-2/3">
              <RestaurantsSearch />
            </div>
            <div className="hidden basis-1/3 sm:block">
              <RestaurantsSortBy />
            </div>
            <div className="sm:hidden">
              <MobileFilterMenu />
            </div>
          </section>
          <main>
            <RestaurantsList restaurants={restaurantsData} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
