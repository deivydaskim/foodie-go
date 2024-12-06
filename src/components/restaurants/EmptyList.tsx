import SearchIcon from '@/assets/basic-icons/search-icon.svg';
import { updateQueryParam } from '@/lib/utils';
import Button from '../ui/Button';

type EmptyListProps = {
  searchQuery: string | null;
};

const EmptyList = ({ searchQuery }: EmptyListProps) => {
  const handleResetSearch = () => {
    updateQueryParam('search', '');
  };

  return (
    <div className="my-10 flex flex-col items-center gap-5 p-2">
      {searchQuery ? (
        <>
          <SearchIcon width="100px" height="100px" />
          <h2>We didn&apos;t find a match for &quot;{searchQuery}&quot;</h2>
          <p>Try searching for something else instead</p>
          <Button onClick={handleResetSearch}>Reset search</Button>
        </>
      ) : (
        <>
          <h2>We didn&apos;t find anything for your options.</h2>
          <p>Try select something else instead</p>
        </>
      )}
    </div>
  );
};

export default EmptyList;
