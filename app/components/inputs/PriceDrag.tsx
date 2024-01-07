import React from 'react';

const PriceRangeSlider = () => {
  return (
    <div className="double-slider-box bg-white p-8 rounded-lg max-w-20rem">
      <h3 className="range-title mb-16">Price Range Slider</h3>
      <div className="range-slider relative w-full h-5 my-8 bg-gray-500">
        <div className="slider-track absolute h-full bg-red-500"></div>
        <input type="range" className="absolute w-full bg-none pointer-events-none top-1/2 transform -translate-y-1/2 appearance-none" />
      </div>
      <div className="input-box flex">
        <div className="min-box w-1/2 pr-2 mr-2">
          {/* min-box content goes here */}
        </div>
        <div className="max-box w-1/2">
          {/* max-box content goes here */}
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
