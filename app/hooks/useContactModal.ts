import { create } from 'zustand';

interface ContactModalStore {
  isOpen: boolean;
  data?: any; // Add a property to store additional data
  onOpen: (data?: any) => void; // Modify onOpen to accept data
  onClose: () => void;
}

const useContactModal = create<ContactModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));

export default useContactModal;
