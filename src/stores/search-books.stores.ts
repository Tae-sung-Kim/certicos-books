import { SearchBookReq } from '@/types/serach-books.type';
import { create } from 'zustand';

type SearchStore = {
  search: SearchBookReq;
  setSearch: (search: SearchBookReq) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  search: { query: '', sort: '', page: 1, size: 10, target: '' },
  setSearch: (search: SearchBookReq) =>
    set((state) => ({
      search: { ...state.search, ...search },
    })),
}));
