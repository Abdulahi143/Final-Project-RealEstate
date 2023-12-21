import {create} from 'zustand'

interface RentOrSellModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSellOrRentModal = create<RentOrSellModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}));

export default useSellOrRentModal;