import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';

export default function SearchBooksComponent() {
  return (
    <div>
      <div className="font-bold m-4">도서 검색</div>
      <div className="flex m-4">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="검색어를 입력해주세요."
            className="h-12 indent-7"
          />
          <FaSearch className="absolute left-3 top-4" />
        </div>
        <Button variant="outline" size="sm" className="m-2">
          상세검색
        </Button>
      </div>
      <div className="m-4">
        <div className="text-sm font-bold">
          도서 검색 결과 총 <span className="text-blue-500">{`${0}`}</span>건
        </div>
      </div>
    </div>
  );
}
