'use client';

import { useSearchParams } from 'next/navigation';

import SearchIcon from '@/assets/basic-icons/search-icon.svg';
import { updateQueryParam } from '@/lib/utils';

const RestaurantsSearch = () => {
  const searchParams = useSearchParams();

  const searchInput = searchParams.get('search') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    updateQueryParam('search', newSearchValue);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="What do you want to eat today?"
        className="h-9 w-full rounded-full bg-blueGray-100 p-2 pl-9 placeholder-black outline-none subtitle1 focus:placeholder-gray-300 focus:outline-green"
      />
      <SearchIcon
        width="24px"
        height="24px"
        className="absolute left-3 top-1/2 -translate-y-1/2 scale-75 transform"
      />
    </div>
  );
};

export default RestaurantsSearch;
