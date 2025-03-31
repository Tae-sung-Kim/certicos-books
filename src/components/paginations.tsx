import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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
    <Pagination className="my-8 p-2 rounded-lg shadow cursor-pointer">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePage(Math.max(startPage - pageSize, 1))}
            className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
          />
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
              className={`min-w-[2.5rem] h-10 ${
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
