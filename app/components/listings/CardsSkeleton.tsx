import React from 'react';

const ListingCardPlaceholder = () => {
  return (
    <div className="col-span-1 bg-gray-200 rounded-lg p-4">
      {/* Placeholder content */}
      <div className="animate-pulse">
        <div className="aspect-square bg-gray-300 mb-2"></div>
        <div className="h-4 bg-gray-300 mb-2"></div>
        <div className="h-4 bg-gray-300 mb-2"></div>
        <div className="h-4 bg-gray-300 mb-2"></div>
        <div className="h-4 bg-gray-300 mb-2"></div>
        <div className="h-4 bg-gray-300 mb-2"></div>
        <div className="h-4 bg-gray-300 mb-2"></div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 w-1/2 bg-gray-300"></div>
          <div className="h-4 w-1/4 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardPlaceholder;
