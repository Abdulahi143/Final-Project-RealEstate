import { create } from 'zustand';

interface PaymentModalStore {
  isOpen: boolean;
  data?: any; // Add a property to store additional data
  onOpen: (data?: any) => void; // Modify onOpen to accept data
  onClose: () => void;
}


const usePaymentModal = create<PaymentModalStore>((set) => ({
  isOpen: false,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false })
}));


export default usePaymentModal;
