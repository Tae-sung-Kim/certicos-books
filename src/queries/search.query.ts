import { searchBooks } from '@/services/search.service';
import { SearchBookReq } from '@/types/serach.type';
import { useQuery } from '@tanstack/react-query';

export function useSearchBooks({ query, sort, page, size }: SearchBookReq) {
  const fullback: SearchBookReq = {
    query,
    sort,
    page,
    size,
  };

  const { data = fullback } = useQuery({
    queryKey: ['search', query, sort, page, size],
    queryFn: () => searchBooks({ query, sort, page, size }),
  });

  return data;
}
