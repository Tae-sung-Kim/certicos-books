import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import SearchHistoryComponent from './Search-history.component';

export default function SearchBooksComponent({
  onSearchData,
}: {
  onSearchData: (query: string) => void;
}) {
  const [searchHistory, setSearchHistory, handleDeleteHistory] =
    useLocalStorage<string[]>('searchHistory', []);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);

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

  // 조회 함수
  const handleSearchData = (searchTitle: string) => {
    onSearchData(searchTitle);

    // 중복 검색 기록 삭제
    const updatedHistory = searchHistory.filter((item) => item !== searchTitle);

    if (updatedHistory.length >= 8) {
      updatedHistory.pop(); // 가장 오래된 기록 삭제
      //특정 값 삭제
      handleDeleteHistory({ value: searchTitle });
    }

    setSearchHistory([searchTitle, ...updatedHistory]);
    setFocus(false);
  };

  // 엔터 조회
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!searchTitle) return;

    if (e.key === 'Enter') {
      handleSearchData(searchTitle);
    }
  };

  // 포커스가 들어왔을때
  const handleFocus = () => {
    setFocus(true);
  };

  const handleHistoryClick = (searchValue: string) => {
    setSearchTitle(searchValue);
    handleSearchData(searchValue);
    setFocus(false);
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
                  searchHistory={searchHistory}
                  onHistoryClick={handleHistoryClick}
                  onDeleteHistory={handleDeleteHistory}
                />
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" className="m-2">
            상세검색
          </Button>
        </div>
      </div>
    </>
  );
}
