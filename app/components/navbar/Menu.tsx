"use client"
import Link from "next/link";
import Router from "next/navigation";

const MenuItems = () => {
    const MenuDIrections = {

    }


    return (
      <div
        onClick={() => {}}
        className="
        hidden
          border-[1px] 
          w-full 
          md:w-auto 
          py-2 
          rounded-full 
          shadow-sm 
          hover:shadow-md 
          transition 
          cursor-pointer
          md:flex
          justify-between
        "
      >
        <Link href="/sales">
        <div 
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          All Sales
        </div>
        </Link>
        <Link href="/rents">
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
        </Link>
       <Link href="/about">
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
       </Link>
      </div>
    );
  }
  
  export default MenuItems;
  