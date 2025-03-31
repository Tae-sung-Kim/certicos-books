import { searchBooks } from '@/services/search-books.service';
import { SearchBookReq, SearchBookRes } from '@/types/serach-books.type';
import { useQuery } from '@tanstack/react-query';

export function useSearchBooks({ query, sort, page, size }: SearchBookReq) {
  const fullback: SearchBookRes = {
    authors: [],
    contents: '',
    datetime: new Date(),
    isbn: '',
    price: 0,
    publisher: '',
    sale_price: 0,
    status: '',
    thumbnail: '',
    title: '',
    translators: [],
    url: '',
  };

  const { data = fullback } = useQuery({
    queryKey: ['search', query, sort, page, size],
    queryFn: () => searchBooks({ query, sort, page, size }),
    enabled: !!query,
  });

  return data;
}
