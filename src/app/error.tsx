'use client';

import Button from '@/components/ui/Button';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="mt-20 space-y-4 text-center">
      <h1>Something went wrong!</h1>
      <p>
        We&apos;re sorry, but we encountered an issue while loading the page.
      </p>
      <div>
        <h2>Error details:</h2>
        <pre>{error.message}</pre>
      </div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default ErrorPage;
