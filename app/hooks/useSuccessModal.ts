import { create } from 'zustand';

interface MessageModalStore {
  isOpen: boolean;
  data?: any;
  onOpen: (data?: any) => void;
  onClose: () => void;
}

const useSuccessModal = create<MessageModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));

export default useSuccessModal;
