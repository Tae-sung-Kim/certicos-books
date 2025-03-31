import { SearchBookReq } from '@/types/serach-books.type';

export default function DetailSearchBooksComponent({
  onSearchData,
}: {
  onSearchData: ({ query, sort, page, size }: SearchBookReq) => void;
}) {
  console.log(onSearchData);

  return <div></div>;
}
