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
  console.log(totalCount, currentPage, onPage);

  const totalPages = Math.ceil(totalCount / pageSize);
  const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const endPage = Math.min(startPage + 9, totalPages);

  console.log(totalPages, startPage, endPage);

  const handlePage = (page: number) => {
    onPage(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePage(Math.max(startPage - pageSize, 1))}
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
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => handlePage(startPage + pageSize)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
