import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { IoChevronForwardSharp, IoChevronBackSharp } from 'react-icons/io5';

export default function Paginations({
  totalCount,
  currentPage,
  pageSize = 10,
  onPage,
}: {
  totalCount: number;
  currentPage: number;
  pageSize?: number;
  onPage: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  const handlePage = (page: number) => {
    onPage(page);
  };

  return (
    <Pagination className="my-8 p-2 rounded-lg shadow cursor-pointer overflow-hidden">
      <PaginationContent className="flex flex-wrap justify-center gap-1 overflow-x-auto py-1 max-w-full">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePage(Math.max(startPage - pageSize, 1))}
            className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePage(Math.max(currentPage - 1, 1))}
            className="hover:bg-blue-50 hover:text-blue-600 transition-colors min-w-8 h-8 text-sm sm:min-w-9 sm:h-9 md:min-w-10 md:h-10 md:text-base flex items-center justify-center"
          >
            <IoChevronBackSharp />
          </PaginationLink>
        </PaginationItem>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                handlePage(page);
              }}
              isActive={page === currentPage}
              className={`w-8 h-8 text-sm sm:w-9 sm:h-9 md:w-10 md:h-10 md:text-base flex items-center justify-center ${
                page === currentPage
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'hover:bg-blue-50 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePage(Math.min(currentPage + 1, totalPages))}
            className="hover:bg-blue-50 hover:text-blue-600 transition-colors min-w-8 h-8 text-sm sm:min-w-9 sm:h-9 md:min-w-10 md:h-10 md:text-base flex items-center justify-center"
          >
            <IoChevronForwardSharp />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePage(Math.min(startPage + pageSize, totalPages))
            }
            className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
