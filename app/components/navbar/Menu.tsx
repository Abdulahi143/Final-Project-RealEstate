"use client"
import Router from "next/navigation";

const MenuItems = () => {
    const MenuDIrections = {

    }


    return (
      <div
        onClick={() => {}}
        className="
          border-[1px] 
          w-full 
          md:w-auto 
          py-2 
          rounded-full 
          shadow-sm 
          hover:shadow-md 
          transition 
          cursor-pointer
          flex
          justify-between
        "
      >
        <a href="/sales">
        <div 
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          All Sales
        </div>
        </a>
        <a href="/rents">
        <div 
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px]
          "
        >
          All Rents
        </div>
        </a>
       <a href="/about">
       <div 
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6
          "
        >
          About
        </div>
       </a>
      </div>
    );
  }
  
  export default MenuItems;
  