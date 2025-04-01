import { searchBooks } from '@/services/search-books.service';
import { SearchBookReq, SearchBookRes } from '@/types/serach-books.type';
import { useQuery } from '@tanstack/react-query';

export function useSearchBooks({
  query,
  sort,
  page,
  size,
  target,
}: SearchBookReq) {
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

  const { data = fullback, isFetching } = useQuery({
    queryKey: ['search', query, sort, page, size, target],
    queryFn: () => searchBooks({ query, sort, page, size, target }),
    enabled: !!query,
  });

  return { ...data, isFetching };
}
