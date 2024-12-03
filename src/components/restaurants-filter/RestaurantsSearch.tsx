'use client';

import SearchIcon from '@/assets/basic-icons/search-icon.svg';
import { updateQueryParam } from '@/lib/utils';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const RestaurantsSearch = () => {
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get('search') || '',
  );

  const debouncedUpdateQuery = debounce((value: string) => {
    updateQueryParam('search', value);
  }, 200);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchInput(newSearchValue);
    debouncedUpdateQuery(newSearchValue);
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
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 scale-75 transform" />
    </div>
  );
};

export default RestaurantsSearch;
