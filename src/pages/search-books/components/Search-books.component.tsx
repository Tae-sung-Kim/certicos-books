import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import SearchHistoryComponent from './Search-history.component';
import DetailSearchBooksComponent from './Detail-search-books.component';
import { SearchBookReq } from '@/types/serach-books.type';
import { useSearchStore } from '@/stores/search-books.stores';

export default function SearchBooksComponent({
  onSearchData,
}: {
  onSearchData: ({ query, sort, page, size, target }: SearchBookReq) => void;
}) {
  const { search } = useSearchStore();
  const [searchHistory, setSearchHistory, onDeleteHistory] = useLocalStorage<
    string[]
  >('searchHistory', []);
  const [searchTitle, setSearchTitle] = useState<string>(search.query ?? '');
  const [focus, setFocus] = useState<boolean>(false);
  const [showDetailSearch, setShowDetailSearch] = useState<boolean>(false);

  const historyRef = useRef<HTMLDivElement>(null);

  // 조회값 설정
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocus(true);
    setSearchTitle(e.target.value);
  };

  // X버튼
  const handleClear = () => {
    setSearchTitle('');
  };

  // 조회 함수 - 전체 조회
  const handleSearchData = ({
    query,
    sort,
    page,
    size,
    target,
  }: SearchBookReq) => {
    // 빈값일 경우는 history에 추가하지 않음
    if (!query || query.trim() === '') return;

    onSearchData({ query, sort, page, size, target });

    // 중복 검색 기록 삭제
    const updatedHistory = searchHistory.filter((item) => item !== query);

    if (updatedHistory.length >= 8) {
      updatedHistory.pop(); // 가장 오래된 기록 삭제
      //특정 값 삭제
      onDeleteHistory({ value: query });
    }

    setSearchHistory([query, ...updatedHistory]);
    setFocus(false);
  };

  // 엔터 조회
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchData({
        query: searchTitle,
      });
    }
  };

  // 포커스가 들어왔을때
  const handleFocus = () => {
    setFocus(true);
    setShowDetailSearch(false);
  };

  const handleHistoryClick = (searchValue: string) => {
    setSearchTitle(searchValue);
    handleSearchData({ query: searchValue });
    setFocus(false);
  };

  // 상세검색 활성화
  const handleDetailSearchShow = () => {
    setFocus(false);
    setShowDetailSearch(!showDetailSearch);
    setSearchTitle('');
  };

  // 상세 검색
  const handleDetailSearch = (search: SearchBookReq) => {
    onSearchData(search);
    setShowDetailSearch(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        historyRef.current &&
        !historyRef.current.contains(e.target as Element)
      ) {
        setFocus(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="font-bold m-4">도서 검색</div>
      <div ref={historyRef} className="m-4">
        <div className="flex m-4">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="검색어를 입력해주세요."
              className="h-12 indent-7"
              onKeyDown={handleKeyDown}
              onChange={handleSearch}
              onFocus={handleFocus}
              value={searchTitle}
            />
            <FaSearch className="absolute left-3 top-4" />
            {searchTitle && (
              <FaTimes
                className="absolute right-4 top-3 cursor-pointer hover:bg-gray-300 rounded-lg p-1 text-2xl"
                onClick={handleClear}
              />
            )}
            {searchHistory.length > 0 && focus && (
              <div className="absolute left-0 right-0 top-[100%] z-10 mt-1 bg-white shadow-lg rounded-lg">
                <SearchHistoryComponent
                  searchTitle={searchTitle}
                  searchHistory={searchHistory}
                  onHistoryClick={handleHistoryClick}
                  onDeleteHistory={onDeleteHistory}
                />
              </div>
            )}
          </div>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="m-2"
              onClick={handleDetailSearchShow}
            >
              상세검색
            </Button>
            {showDetailSearch && (
              <DetailSearchBooksComponent
                onSearchData={handleDetailSearch}
                onClose={handleDetailSearchShow}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
