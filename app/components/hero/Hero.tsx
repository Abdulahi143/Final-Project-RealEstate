import React from 'react';

const Hero = () => {
  return (
    <section className="text-black body-font pt-24">
      <div className="container mx-auto flex flex-col items-center px-5 py-5 md:flex-row">
        <div className="lg:flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font tracking-wide sm:text-3xl md:text-6xl xl:text-7xl mb-4 font-bold">
            Discover Your{' '}
            <span className="text-green-500">Dream Home</span>
          </h1>
          <span className="mb-8 leading-relaxed text-[18px] lg:text-[28px] text-green-500">
            @Dugsiiye Real Estate
          </span>
        </div>
        <div className="w-32 sm:w-40 lg:max-w-xl lg:w-full md:w-32 xl:w-5/6 bg-contain bg-no-repeat md:ml-40 xl:mr-16">
          <div className="w-full flex gap-3 justify-center">
            <img
              className="object-cover object-center rounded-xl"
              alt="hero"
              src="/images/hero/1.png"
            />
            <img
              className="object-cover object-center rounded-xl"
              alt="hero"
              src="/images/hero/2.png"
            />
          </div>
          <div className="w-full h- flex gap-2 justify-center items-center my-2">
            <img
              className="object-cover object-center rounded-xl"
              alt="hero"
              src="/images/hero/3.png"
            />
            <img
              className="object-cover object-center rounded-xl"
              alt="hero"
              src="/images/hero/4.png"
            />
            <img
              className="object-cover object-center rounded-xl"
              alt="hero"
              src="/images/hero/5.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
