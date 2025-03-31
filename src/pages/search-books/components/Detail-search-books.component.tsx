import { DetailSearchBookReq, SearchBookReq } from '@/types/serach-books.type';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DETAIL_SEARCH_BOOKS_SELECT } from '@/constant/books';
import { useState } from 'react';

export default function DetailSearchBooksComponent({
  onSearchData,
}: {
  onSearchData: ({ query, target }: SearchBookReq) => void;
}) {
  const [detailType, setDetailType] =
    useState<keyof DetailSearchBookReq>('title');

  const [query, setQuery] = useState<string>('');

  const handleDetailTypeChange = (value: string) => {
    setDetailType(value as keyof DetailSearchBookReq);
  };

  const handleSearchData = () => {
    onSearchData({ query, target: detailType });
  };

  return (
    <div className="absolute right-0 top-full mt-1 w-full sm:w-96 border rounded-lg space-y-4 bg-white shadow-md z-50 max-h-[300px] overflow-auto">
      <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0 p-4">
        <div className="w-full sm:w-[150px]">
          <Select value={detailType} onValueChange={handleDetailTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
              {DETAIL_SEARCH_BOOKS_SELECT.map((d) => (
                <SelectItem value={d.value}>{d.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="검색어 입력"
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="p-4 pt-0">
        <Button
          className="w-full bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
          onClick={() => handleSearchData()}
        >
          검색하기
        </Button>
      </div>
    </div>
  );
}
