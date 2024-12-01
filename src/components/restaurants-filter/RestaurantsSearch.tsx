'use client';

import { useRestaurantsStore } from '@/app/restaurantsStore';
import SearchIcon from '@/assets/basic-icons/search-icon.svg';

const RestaurantsSearch = () => {
  const searchQuery = useRestaurantsStore(state => state.searchQuery);
  const setSearchQuery = useRestaurantsStore(state => state.setSearchQuery);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="What you want to eat today?"
        className="h-9 w-full rounded-full bg-blueGray-100 p-2 pl-9 placeholder-black outline-none subtitle1 focus:placeholder-gray-300 focus:outline-green"
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 scale-75 transform" />
    </div>
  );
};

export default RestaurantsSearch;
