"use client"
import React, { useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import useSellModal from '@/app/hooks/useSellModal';
import useSellOrRentModal from '@/app/hooks/useSellOrRentModal';
import Heading from '../Heading';

const RentOrSellModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<'rent' | 'sell' | ''>('');

  const sellOrRentModal = useSellOrRentModal();
  const rentModal = useRentModal();
  const sellModal = useSellModal();



  const handleRent = () => {
    setSelectedType('rent');
    rentModal.onOpen();
    sellOrRentModal.onClose();
  };

  const handleSell = () => {
    setSelectedType('sell');
    sellModal.onOpen();
    sellOrRentModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-8 items-center">
      <Heading title="Do you want to sell or rent?" />
      <div className="flex flex-row justify-center w-full">
        <div className={`flex flex-col items-center mr-24 mt-8 cursor-pointer ${selectedType === 'rent' ? 'opacity-50' : ''}`} onClick={handleRent}>
          <img src="/images/rent.png" alt="Rent" className="max-w-full ml-1 h-auto" />
        </div>
        <div className={`flex flex-col items-center ml-24 cursor-pointer ${selectedType === 'sell' ? 'opacity-50' : ''}`} onClick={handleSell}>
          <img src="/images/sell.png" alt="Sell" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={sellOrRentModal.isOpen}
      title="Rent or Sell your house or apartment!"
      actionLabel="Sell"
      onSubmit={handleSell}
      secondaryActionLabel="Rent"
      secondaryAction={handleRent}
      onClose={sellOrRentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentOrSellModal;
