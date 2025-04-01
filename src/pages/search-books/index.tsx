import { useState } from 'react';
import SearchBooksComponent from './components/Search-books.component';
import TotalCountBooksComponent from '../components/TotalCount-books.component';
import { useSearchBooks } from '@/queries/search-books.query';
import BooksListComponent from '../components/Books-list.component';
import Paginations from '@/components/paginations';
import { SearchBookReq } from '@/types/serach-books.type';
import { useSearchStore } from '@/stores/search-books.stores';
import { BooksListSkeleton } from '../components/Books-list-skeleton.component';

export default function SearchBookPage() {
  const { search, setSearch } = useSearchStore();
  const [currentPage, setCurrentPage] = useState(search.page ?? 1);
  const [pageSize, setPageSize] = useState<string>(String(search.size ?? 10));

  const { documents, meta, isFetching } = useSearchBooks({ ...search });

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

  const handlePageSize = (pageSize: string) => {
    setPageSize(pageSize);
    setSearch({
      ...search,
      size: Number(pageSize),
    });
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
    setSearch({
      ...search,
      page,
    });
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

      {isFetching ? (
        <BooksListSkeleton dataLength={Number(documents?.length ?? 0)} />
      ) : (
        <BooksListComponent
          bookList={documents}
          noDataText="검색된 결과가 없습니다."
        />
      )}

      {meta && meta.pageable_count > 0 && (
        <Paginations
          totalCount={meta.pageable_count}
          currentPage={currentPage}
          pageSize={Number(pageSize)}
          onPage={(page) => handlePage(page)}
          onPageSize={(pageSize) => handlePageSize(pageSize)}
        />
      )}
    </div>
  );
}
