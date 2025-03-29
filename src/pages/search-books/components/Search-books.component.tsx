import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';

export default function SearchBooksComponent({
  onSearchData,
}: {
  onSearchData: (query: string) => void;
}) {
  const [searchTitle, setSearchTitle] = useState<string>('');

  // 조회값 설정
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  // X버튼
  const handleClear = () => {
    setSearchTitle('');
  };

  // 엔터 조회
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchData(searchTitle);
    }
  };

  return (
    <div>
      <div className="font-bold m-4">도서 검색</div>
      <div className="flex m-4">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="검색어를 입력해주세요."
            className="h-12 indent-7"
            onKeyDown={handleKeyDown}
            onChange={handleSearch}
            value={searchTitle}
          />
          <FaSearch className="absolute left-3 top-4" />
          {searchTitle && (
            <FaTimes
              className="absolute right-4 top-3 cursor-pointer hover:bg-gray-300 rounded-full p-1 text-2xl"
              onClick={handleClear}
            />
          )}
        </div>
        <Button variant="outline" size="sm" className="m-2">
          상세검색
        </Button>
      </div>
      {[1, 2, 3].length > 0 && (
        <div className="m-4">
          <div className="text-sm font-bold">검색 기록</div>
          <ul className="mt-2">
            {[1, 2, 3].map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
