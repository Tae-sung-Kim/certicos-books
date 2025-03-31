import { useState } from 'react';
import SearchBooksComponent from './components/Search-books.component';
import TotalCountBooksComponent from './components/TotalCount-books.component';
import { useSearchBooks } from '@/queries/search-books.query';
import BooksListComponent from './components/Books-list.component';
import Paginations from '@/components/paginations';
import { SearchBookReq } from '@/types/serach-books.type';

export default function SearchBookPage() {
  const [search, setSearch] = useState<SearchBookReq>({
    query: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { documents, meta } = useSearchBooks({ ...search });

  const handleSearchData = ({
    query,
    sort,
    page,
    size,
    target,
  }: SearchBookReq) => {
    setSearch({
      query,
      sort,
      page,
      size,
      target,
    });
    setCurrentPage(1);
  };

  return (
    <div className="container">
      {/* 검색 영역 */}
      <SearchBooksComponent onSearchData={handleSearchData} />
      {/* 조회 책 건수 */}
      <TotalCountBooksComponent
        title="도서 검색 결과 총"
        count={meta?.pageable_count ?? 0}
      />
      {/* 조회 책 목록 */}
      <BooksListComponent bookList={documents} />
      {meta && meta.pageable_count > 0 && (
        <Paginations
          totalCount={meta.pageable_count}
          currentPage={currentPage}
          pageSize={10}
          onPage={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
