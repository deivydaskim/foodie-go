import type { Restaurant } from './RestaurantInfo';
import RestaurantInfo from './RestaurantInfo';

type RestaurantListProps = {
  data: Restaurant[];
};

const RestaurantsList = ({ data }: RestaurantListProps) => {
  if (data.length === 0) {
    return <div>No restaurants found.</div>;
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <h2>Order from {data.length} places</h2>
      {data.map(restaurant => (
        <RestaurantInfo key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantsList;
