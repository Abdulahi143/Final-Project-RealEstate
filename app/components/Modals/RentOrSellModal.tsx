"use client"

import React, { useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import useSellModal from '@/app/hooks/useSellModal';
import useSellOrRentModal from '@/app/hooks/useSellOrRentModal';
import Heading from '../Heading';

const RentOrSellModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sellOrRentModal = useSellOrRentModal();
  const rentModal = useRentModal();
  const sellModal = useSellModal();

  const handleRent = () => {
    rentModal.onOpen();
    sellOrRentModal.onClose();
  };

  const handleSell = () => {
    sellModal.onOpen();
    sellOrRentModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-8 items-center">
      <Heading
        title="Do you want to sell or rent?"
        
      />
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
