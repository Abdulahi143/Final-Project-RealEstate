import {create} from 'zustand'

interface SellModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSellModal = create<SellModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}));

export default useSellModal;