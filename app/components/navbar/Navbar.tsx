import React from 'react';
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import MenuItems from "./Menu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const navbarClasses = "fixed top-0 w-full bg-white z-10 shadow-sm";

  if (!currentUser) {
    // Handle the case where currentUser is null
    return (
      <div className={navbarClasses}>
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <MenuItems />
              <UserMenu currentUser={currentUser} />
            </div>
          </Container>
        </div>
      </div>
    );
  }

  // Handle the case where currentUser is not null
  return (
    <div className={navbarClasses}>
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* <Search /> */}
            <MenuItems />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;
