import FoodFilterSlider from '@/components/food-filter-slider/FoodFilterSlider';
import FiltersMenuButton from '@/components/restaurants-filter/FiltersMenuButton';
import RestaurantsFilters from '@/components/restaurants-filter/RestaurantsFilters';
import RestaurantsSearch from '@/components/restaurants-filter/RestaurantsSearch';
import RestaurantsSortBy from '@/components/restaurants-filter/RestaurantsSortBy';
import RestaurantsList from '@/components/restaurants/RestaurantsList';

// Dynamic rendering instead of Static because data of URL Search params can only be known at request time for components;
// Also posible to wrap in Suspense, by making it CSR instead of SSR, but lossing SEO;
export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const res = await fetch('http://localhost:3000/api/restaurants', {
    cache: 'force-cache',
  });
  const restaurantsData = await res.json();

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
