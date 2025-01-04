import Image from 'next/image';
import { notFound } from 'next/navigation';

import ImportantIcon from '@/assets/basic-icons/important-icon.svg';
import testDishImage from '@/assets/images/bento-1.jpg';
import testRestaurantImage from '@/assets/images/pexels-brett-sayles-1322184.jpg';
import RestaurantInfo from '@/components/restaurants/RestaurantInfo';
import AddRemoveCartButton from '@/components/shopping-cart/AddRemoveCartButton';
import MenuNavigator from '@/components/ui/MenuNav';
import restaurantsData from '@/data/restaurants.json';
import { capitalizeEachWord, formatPrice } from '@/lib/utils';
import { Restaurant } from '@/types/restaurant';

const simulateFetchData = () => {
  return new Promise<Restaurant[]>(resolve => {
    setTimeout(() => {
      resolve(restaurantsData as Restaurant[]);
    }, 50);
  });
};

export async function generateStaticParams() {
  const restaurants = await simulateFetchData();

  return restaurants.map(restaurant => ({
    id: String(restaurant.id), // id for params must be string
  }));
}

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const restaurants = await simulateFetchData();

  const restaurant = restaurants.find(
    restaurant => String(restaurant.id) === id,
  );

  if (!restaurant) {
    return {
      title: 'Restaurant Not Found',
      description: 'The restaurant you are looking for does not exist.',
    };
  }

  const capitalizedRestaurantName = capitalizeEachWord(restaurant.name);

  return {
    title: `${capitalizedRestaurantName} - Foodie Go`,
    description: `Check out the menu and order from ${capitalizedRestaurantName}.`,
  };
}

export default async function Page({ params }: Params) {
  const { id } = await params;

  const restaurants = await simulateFetchData();
  const restaurant = restaurants.find(
    restaurant => String(restaurant.id) === id,
  );

  if (!restaurant) {
    notFound();
  }

  const menuTitles = Object.keys(restaurant.menu);

  return (
    <div className="animate-appear rounded-xl bg-gray-100 px-2 py-3 md:px-4 md:py-5">
      <div className="h-32 rounded-lg bg-gray-300 sm:h-44">
        <Image
          priority
          placeholder="blur"
          className="h-full w-full rounded-lg object-cover"
          src={testRestaurantImage}
          alt={restaurant.name}
          width={900}
        />
      </div>
      <RestaurantInfo
        name={restaurant.name}
        categories={restaurant.categories}
        address={restaurant.address}
        deliveryFee={restaurant.deliveryFee}
        distance={restaurant.distance}
        numberOfReviews={restaurant.numberOfReviews}
        rating={restaurant.rating}
      />
      <MenuNavigator sections={menuTitles} />
      <main>
        {menuTitles.map(title => (
          <section id={title} key={title} className="my-10">
            <h2 className="my-6 capitalize">{title}</h2>
            {title === 'lunch' && (
              <div className="relative -top-4 flex items-center gap-2 text-gray-400 caption">
                <ImportantIcon width={16} height={16} />
                <p>
                  Please note: products in this category can only be delivered
                  between: 12:00 - 16:00
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
              {restaurant.menu[title as keyof typeof restaurant.menu].map(
                dish => (
                  <div
                    key={dish.id}
                    className="flex justify-between gap-2 rounded-2xl bg-white p-4 shadow-xl"
                  >
                    <div className="basis-2/3 space-y-2">
                      <h5 className="body2">{dish.title}</h5>
                      <p className="subtitle1">{formatPrice(dish.price)}</p>
                      <p className="line-clamp-2 text-gray-400 subtitle2">
                        {dish.description}
                      </p>
                    </div>
                    <div className="relative h-24 w-28 self-center rounded-xl bg-gray-300 text-center">
                      <Image
                        placeholder="blur"
                        alt={dish.title}
                        src={testDishImage}
                        width={150}
                        height={100}
                        className="h-full rounded-lg object-cover"
                      />
                      <AddRemoveCartButton
                        restaurantDeliveryFee={restaurant.deliveryFee}
                        restaurantName={restaurant.name}
                        classes="absolute right-2 top-2"
                        id={dish.id}
                        title={dish.title}
                        price={dish.price}
                      />
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
