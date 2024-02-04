'use client';

import LoginModal from "../components/Modals/LoginModal";
import RegisterModal from "../components/Modals/RegisterModal";
import RentModal from "../components/Modals/RentModal";
import SearchModal from "../components/Modals/SearchModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <RentModal />
    </>
   );
}
 
export default ModalsProvider;