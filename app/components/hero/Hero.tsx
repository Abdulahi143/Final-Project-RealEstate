import React from 'react';

const Hero = () => {
  return (
    <>
      <div className="relative text-center bg-black">
        {/* Overlay to darken the image */}
        <div className="opacity-50">
          <img
            loading="lazy"
            src="/images/hero2.png"
            className="w-full opacity-75"
            alt="Hero"
          />
          
        </div>

        {/* Adjusted for center alignment on small screens */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[6px]">
          <div className="text-[24px] lg:text-[45px] font-['Poppins'] font-bold">
            <span className="text-[#fff]">Discover Your </span>
            <span className="text-green-300">Dream Home</span>
            <span className="text-[#fff]"> Today!</span>
          </div>
          <span className="text-[18px] lg:text-[28px] text-green-300">@Dugsiiye Real Estate</span>
        </div>

      </div>
    </>
  );
};

export default Hero;
