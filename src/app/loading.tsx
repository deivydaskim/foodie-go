const Loading = () => {
  return (
    <div className="flex h-80 items-center justify-center rounded-xl">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-darkGreen border-t-transparent"></div>
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
