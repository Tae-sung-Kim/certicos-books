import apiInstance from '@/api';
import { SearchBookReq } from '@/types/serach-books.type';
import qs from 'qs';

// 책 조회하기
export const searchBooks = async ({
  query,
  sort,
  page,
  size,
  target,
}: SearchBookReq) => {
  const params = qs.stringify({
    query,
    sort,
    page,
    size,
    target,
  });

  const response = await apiInstance.get(`?${params}`);
  return response.data;
};
