// import { useSearchBooks } from '@/queries/search.query';

import { useEffect, useState } from 'react';
import SearchBooksComponent from './components/Search-books.component';
import TotalCountBooksComponent from './components/TotalCount-books.component';
import { useSearchBooks } from '@/queries/search-books.query';

export default function SearchBookPage() {
  const [query, setQuery] = useState<string>('');

  const { documents } = useSearchBooks({ query: query });

  const handleSearchData = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    console.log(documents);
  }, [documents]);

  return (
    <div className="container">
      {/* 검색 영역 */}
      <SearchBooksComponent onSearchData={handleSearchData} />
      {/* 조회 책 건수 */}
      <TotalCountBooksComponent
        title="도서 검색 결과 총"
        count={documents?.length}
      />
      {/* 조회 책 목록 */}
    </div>
  );
}
