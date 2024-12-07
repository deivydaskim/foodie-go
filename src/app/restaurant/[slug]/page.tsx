import RestaurantInfo from '@/components/restaurants/RestaurantInfo';
import type { Restaurant } from '@/components/restaurants/RestaurantsItem';
import restaurantsData from '@/data/restaurants.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import testDishImage from '@/assets/images/bento-1.jpg';
import FoodAddButton from '@/components/FoodAddButton';

export async function generateStaticParams() {
  const restaurants = restaurantsData;

  return restaurants.map(restaurant => ({
    slug: String(restaurant.id), // Slug must be string
  }));
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;

  const restaurants = restaurantsData as Restaurant[];
  const restaurant = restaurants.find(r => String(r.id) === slug);

  if (!restaurant) {
    notFound();
  }

  const restaurantMenuKeys = Object.keys(restaurant.menu);

  return (
    <div className="rounded-xl bg-gray-100 px-2 py-3 md:px-4 md:py-5">
      <div className="h-32 rounded-lg bg-gray-300 sm:h-44">IMAGE</div>
      <RestaurantInfo
        name={restaurant.name}
        categories={restaurant.categories}
        address={restaurant.address}
        deliveryFee={restaurant.deliveryFee}
        distance={restaurant.distance}
        numberOfReviews={restaurant.numberOfReviews}
        rating={restaurant.rating}
      />
      <ul className="flex gap-6 overflow-auto border-b-2 border-black px-6 py-2 scrollbar-thin">
        {restaurantMenuKeys.map(menuKey => (
          <li key={menuKey}>
            <a
              href={`#${menuKey}`}
              className="rounded-full px-4 py-2 capitalize button hover:bg-blueGray-100"
            >
              {menuKey}
            </a>
          </li>
        ))}
      </ul>
      <main>
        {restaurantMenuKeys.map(menuKey => (
          <section id={menuKey} key={menuKey} className="my-10">
            <h2 className="my-6 capitalize">{menuKey}</h2>
            <div className="grid grid-cols-2 gap-6">
              {restaurant.menu[menuKey as keyof typeof restaurant.menu].map(
                dish => (
                  <div
                    key={dish.id}
                    className="flex justify-between gap-2 rounded-xl bg-white p-4 shadow-xl"
                  >
                    <div className="basis-2/3 space-y-2">
                      <h5 className="body2">{dish.title}</h5>
                      <p className="subtitle1">${dish.price.toFixed(2)}</p>
                      <p className="text-gray-400 subtitle2">
                        {dish.description}
                      </p>
                    </div>
                    <div className="relative h-24 w-28 rounded-lg bg-gray-300 text-center">
                      <Image
                        alt="image"
                        src={testDishImage}
                        width={150}
                        height={100}
                        className="block h-full rounded-lg object-cover"
                      />
                      <FoodAddButton />
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
