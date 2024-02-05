'use client';

import LoginModal from "../components/Modals/LoginModal";
import RegisterModal from "../components/Modals/RegisterModal";
import RentModal from "../components/Modals/RentModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <RegisterModal />
      <RentModal />
    </>
   );
}
 
export default ModalsProvider;