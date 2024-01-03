import React from "react";

const CardsSkeleton: React.FC = () => {
  const skeletons = Array.from({ length: 6 }, (_, index) => (
    <div
      key={index}
      className="col-span-1 cursor-pointer group border border-gray-300 rounded-lg overflow-hidden w-full sm:max-w-lg"
    >
      {/* Skeleton for image container */}
      <div className="aspect-square bg-gray-200 animate-pulse" />

      <div className="p-3 flex flex-col gap-2 w-full">
        {/* Skeleton for title */}
        <div className="h-6 bg-gray-200 animate-pulse" />

        {/* Skeleton for location */}
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-400 rounded-full" />
          <div className="h-4 bg-gray-200 w-full animate-pulse" />
        </div>

        {/* Skeleton for category or date */}
        <div className="font-light text-neutral-500 h-4 bg-gray-200 animate-pulse" />

        {/* Skeleton for description */}
        <div className="text-sm text-gray-200 line-clamp-2 bg-gray-200 animate-pulse" />

        {/* Skeleton for details */}
        <div className="flex flex-row justify-start items-center gap-2 mt-2">
          <div className="h-4 bg-gray-200 w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-200 w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-200 w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-200 w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-200 w-1/4 animate-pulse" />
        </div>

        {/* Skeleton for price */}
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold h-6 bg-gray-200 w-1/3 animate-pulse" />
          <div className="font-light h-6 bg-gray-200 w-2/3 animate-pulse" />
        </div>
      </div>
    </div>
  ));

  return <>{skeletons}</>;
};

export default CardsSkeleton;
