import { Button } from '@/components/ui/button';
import { RiDeleteBin6Line } from 'react-icons/ri';
import HistoryHighLightText from './History-high-light-text.component';

export default function SearchHistoryComponent({
  searchTitle,
  searchHistory,
  onHistoryClick,
  onDeleteHistory,
}: {
  searchTitle: string;
  searchHistory: string[];
  onHistoryClick: (searchValue: string) => void;
  onDeleteHistory: (options?: { key?: string; value?: string }) => void;
}) {
  return (
    <div className="py-2">
      <ul className="space-y-2">
        {searchHistory.map((d, i) => (
          <li
            key={i}
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
            onClick={() => onHistoryClick(d)}
          >
            <span className="text-sm">
              {<HistoryHighLightText text={d} query={searchTitle} />}
            </span>
            <RiDeleteBin6Line
              size={18}
              className="cursor-pointer hover:text-gray-500 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                return onDeleteHistory({ value: d });
              }}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-2 border-t pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDeleteHistory()}
          className="text-xs"
        >
          전체삭제
        </Button>
      </div>
    </div>
  );
}
