'use client';
import React, { useState } from 'react';
import SpecialModal from './SpecialModal';
import { usePathname, useRouter } from 'next/navigation';
import usePaymentModal from '@/app/hooks/usePaymentModal';
import { TbBrandStripe } from 'react-icons/tb';
import { API } from '@/lib/config';
import axios from 'axios';
import { SafeListing } from '@/app/types';


const localPayments = [

    {
      id: 1,
      title: "Evc Plus"
    },
    {
      id: 2,
      title: "Zaad",
    },
    {
      id: 3,
      title: "Sahal",
    },
    {
        id: 4,
        title: "Swish",
    },
    {
        id: 5,
        title: "M-Pesa",
    }
  ]

  interface PaymentModalProps {
    listing: SafeListing;
  }
  


const PaymentModal = () => {
  
  const pathName = usePathname;
  const [isLoading, setIsLoading] = useState(false);
  const paymentModal = usePaymentModal();
  const listing = usePaymentModal((state) => state.data);

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'local' | null>(null);

  const [selectedLocalPayment, setSelectedLocalPayment] = useState(localPayments[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const router = useRouter()

//   const { cartItems } = useShoppingCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleStripeSession = async () => {
    try {
        // Log the request payload for debugging purposes

        // Make a POST request to the backend API endpoint for creating a Stripe session
        const { data } = await axios.post(`${API}/user/session`, { listings: [listing] });

        // Log the response data for debugging purposes

        // Redirect to the Stripe checkout page using the received URL
        router.push(data.url);
    } catch (error: any) {
        // Log and handle errors that occur during the process
        console.error("Error caught in catch block:", error);

        // Also log the error details if available
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Status Text:", error.response.statusText);
            console.error("Headers:", error.response.headers);
        }

        // Handle other errors if needed
    }
};
  
  
  
  


  const onSubmit = async () => {

  };

  const bodyContent = (

     

        <>
         <div className="container mx-auto p-4">
          <h2 className="text-center text-3xl font-bold my-6">Choose Payment Method</h2>
          <div className="flex justify-center space-x-6 my-6">
            <div
              className={`${paymentMethod === 'online' && 'border-green-600'} p-6 border rounded-lg cursor-pointer hover:shadow-lg`}
              onClick={() => setPaymentMethod('online')}
            >
              Online Payment
            </div>
            <div
              className={`${paymentMethod === 'local' && 'border-green-600'} p-6 border rounded-lg cursor-pointer hover:shadow-lg`}
              onClick={() => setPaymentMethod('local')}
            >
              Local Payment
            </div>
          </div>

          {paymentMethod === 'local' && (
            <>
              <div className="grid grid-cols-3 gap-4 my-4">
                {
                  localPayments.map((payment) => (
                    <div
                      onClick={() => setSelectedLocalPayment(payment)}

                      className={`p-4 border rounded-lg cursor-pointer ${selectedLocalPayment.title === payment.title && 'border-green-600'}`}>{payment.title}</div>
                  ))
                }
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter your phone number"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500"
                />
                <button type="submit" className="mt-4 px-6 py-2 bg-main-500 text-white rounded-lg hover:bg-main-600">
                  Submit
                </button>
              </form>
            </>
          )}


          {paymentMethod === 'online' && (
            <button
              onClick={handleStripeSession}

              className="mx-auto w-full flex items-center justify-center px-6 py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 gap-x-2">
              <TbBrandStripe /> Pay with Stripe
            </button>
          )}
        </div>
        <h2 className="text-center text-xl mb-0 mt-16 my-10">NOTE: After the payment is made, one of our agents will reach out to the property owner to ensure that everything proceeds smoothly for you. At Dugsiiye, your safety and satisfaction are our top priorities.</h2>
        </>
  );

  return (
    <SpecialModal
      disabled={isLoading}
      isOpen={paymentModal.isOpen}
      title="Dreams have finally become a reality!"
      actionLabel="Contact"
      onClose={paymentModal.onClose}
      body={bodyContent}
    />
  );
};

export default PaymentModal;
