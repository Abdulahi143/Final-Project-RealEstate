import React from 'react';

const CancelPage = () => {
  return (
    <>
      <div className="h-screen mt-24">
        <div className="bg-white p-6 md:mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="256"
            height="256"
            viewBox="0 0 256 256"
            xmlSpace="preserve"
            className="text-red-600 w-320 h-20 mx-auto my-6"
          >
            <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
              <path
                d="M 11 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 c -4.295 -4.296 -4.295 -11.261 0 -15.557 l 68 -68 c 4.297 -4.296 11.26 -4.296 15.557 0 c 4.296 4.296 4.296 11.261 0 15.557 l -68 68 C 16.63 88.926 13.815 90 11 90 z"
                style={{ fill: 'rgb(214,0,0)' }}
                transform=" matrix(1 0 0 1 0 0) "
              />
              <path
                d="M 79 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 l -68 -68 c -4.295 -4.296 -4.295 -11.261 0 -15.557 c 4.296 -4.296 11.261 -4.296 15.557 0 l 68 68 c 4.296 4.296 4.296 11.261 0 15.557 C 84.63 88.926 81.815 90 79 90 z"
                style={{ fill: 'rgb(214,0,0)' }}
                transform=" matrix(1 0 0 1 0 0) "
              />
            </g>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Canceled!
            </h3>
            <div className="py-10 text-center">
              <a
                href="/"
                className="px-12 bg-green-600 hover:bg-green-500 text-white font-semibold py-3"
              >
                GO BACK
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelPage;
