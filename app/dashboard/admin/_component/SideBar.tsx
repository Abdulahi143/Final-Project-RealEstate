"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname } from "next/navigation";


import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { MdOutlineSell, MdSell } from 'react-icons/md';
import { LiaKeySolid } from 'react-icons/lia';
import { IoSettingsOutline } from 'react-icons/io5';

import { GoHome, GoHomeFill } from "react-icons/go";
import { RiArrowLeftDoubleFill } from "react-icons/ri";

import { HiUsers } from "react-icons/hi";
import { HiCurrencyDollar, HiOutlineUsers } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { FaKey } from "react-icons/fa";

type Props = {};

interface SideNavItemType {
  icon?: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  label: string;
  href: string;
}

const sidebarItems: SideNavItemType[] = [
  {
    icon: {
      icon: <GoHome />,
      fillIcon: <GoHomeFill />
    },
    label: "Home",
    href: "/dashboard/admin"
  },
  {
    icon: {
      icon: <HiOutlineCurrencyDollar />,
      fillIcon: <HiCurrencyDollar />
    },
    label: "Profits",
    href: "/dashboard/admin/profits"
  },
  {
    icon: {
      icon: <MdOutlineSell />,
      fillIcon: <MdSell />
    },
    label: "Sales",
    href: "/dashboard/admin/sales"
  },
  {
    icon: {
      icon: <LiaKeySolid />,
      fillIcon: <FaKey />
    },
    label: "Rents",
    href: "/dashboard/admin/rents"
  },
  {
    icon: {
      icon: <HiOutlineUsers />,
      fillIcon: <HiUsers />
    },
    label: "Users",
    href: "/dashboard/admin/users"
  },

  {
    icon: {
      icon: <IoSettingsOutline />,
      fillIcon: <IoMdSettings />
    },
    label: "Settings ",
    href: "/dashboard/admin/settings"
  }
];
export default function Sidebar({}: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={cn(
        "min-h-screen max-h-screen overflow-y-auto w-fit md:pr-8 pr-3 pt-24 flex flex-col gap-3 border-r-[1px] pl-[50px]",
        isSidebarOpen && "md:w-[250px]"
      )}
    >


      {/* sidenavitems */}

      {sidebarItems.map((d, i) => (
        <HoverContainer key={i}>
          <SideNavItem
            icon={d.icon}
            href={d.href}
            isSidebarOpen={isSidebarOpen}
            label={d.label}
          />
        </HoverContainer>
      ))}

      {/* toggle button  */}
      <section
        className={cn(
          "hidden md:flex w-ful  justify-end",
          !isSidebarOpen && "justify-start"
        )}
      >
        <HoverContainer>
          <RiArrowLeftDoubleFill
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={cn(
              "text-gray-400 transition-all text-4xl",
              !isSidebarOpen && "rotate-180"
            )}
          />
        </HoverContainer>
      </section>
    </div>
  );
}

function SideNavItem({
  href,
  isSidebarOpen,
  icon,
  label
}: SideNavItemType & { isSidebarOpen: boolean }) {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const isActivePage = pathname == href;
  return (
    <Link
      ref={animationParent}
      href={href}
      className="flex gap-2 items-center cursor-pointer"
    >
      {/* icon */}
      <div className="w-[35px] h-[35px] text-3xl">
        {/* <FaXTwitter /> */}
        {isActivePage ? icon?.fillIcon : icon?.icon}
      </div>
      {/* label */}
      {isSidebarOpen && (
        <p
          className={cn(
            "text-xl hidden md:block pr-4  transition-all ",
            isActivePage && "font-bold"
          )}
        >
          {label}
        </p>
      )}
    </Link>
  );
}

function HoverContainer({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div >
      {children}
    </div>
  );
}