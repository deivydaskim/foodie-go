import Link from 'next/link';

import Button from '@/components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="mt-20 space-y-4 text-center">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldnt find the page youre looking for.</p>
      <Link href="/" className="block">
        <Button>Back to home page</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
