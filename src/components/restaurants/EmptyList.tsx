import { updateQueryParam } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useDeferredValue } from 'react';
import Button from '../ui/Button';

const EmptyList = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const deferedSearch = useDeferredValue(searchQuery);

  const handleResetSearch = () => {
    updateQueryParam('search', '');
  };

  const isPending = deferedSearch !== searchQuery;

  return (
    <div
      className={`my-10 flex flex-col items-center gap-5 p-2 transition-opacity ${isPending ? 'opacity-50' : ''}`}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.81879 10.9262C4.81879 7.55316 7.55317 4.81879 10.9262 4.81879C14.2992 4.81879 17.0336 7.55316 17.0336 10.9262C17.0336 14.2992 14.2992 17.0336 10.9262 17.0336C7.55317 17.0336 4.81879 14.2992 4.81879 10.9262ZM10.9262 2C5.99639 2 2 5.99639 2 10.9262C2 15.856 5.99639 19.8524 10.9262 19.8524C12.8935 19.8524 14.7121 19.2159 16.1875 18.1377C16.2401 18.2184 16.3018 18.2949 16.3726 18.3657L19.5941 21.5872C20.1445 22.1376 21.0369 22.1376 21.5873 21.5872C22.1377 21.0368 22.1377 20.1444 21.5873 19.594L18.3658 16.3725C18.295 16.3017 18.2185 16.24 18.1378 16.1874C19.216 14.7121 19.8524 12.8934 19.8524 10.9262C19.8524 5.99639 15.856 2 10.9262 2Z"
          fill="black"
        />
      </svg>
      <h2 className="header2">
        We didn&apos;t find a match for &quot;{deferedSearch}&quot;
      </h2>
      <p>Try searching for something else instead</p>
      <Button onClick={handleResetSearch}>Reset search</Button>
    </div>
  );
};

export default EmptyList;
