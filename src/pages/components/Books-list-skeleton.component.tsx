import { Skeleton } from '@/components/ui/skeleton';

export function BooksListSkeleton({ dataLength }: { dataLength: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: dataLength })
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 border-b border-gray-200"
          >
            {/* 책 이미지 */}
            <Skeleton className="h-24 w-16 rounded-md" />

            <div className="flex-1 space-y-3">
              {/* 제목 */}
              <Skeleton className="h-4 w-3/4" />

              {/* 저자 */}
              <Skeleton className="h-3 w-1/2" />

              {/* 출판사 */}
              <Skeleton className="h-3 w-2/3" />

              {/* 가격 */}
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
    </div>
  );
}
