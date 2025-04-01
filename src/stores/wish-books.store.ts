import { create } from 'zustand';

type WishListStore = {
  currentPage: number;
  pageSize: string;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: string) => void;
};

export const useWishListStore = create<WishListStore>((set) => ({
  currentPage: 1,
  pageSize: '10',
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
}));
