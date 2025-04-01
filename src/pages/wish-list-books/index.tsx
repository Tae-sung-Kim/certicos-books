import { useEffect, useState } from 'react';
import BooksListComponent from '../components/Books-list.component';
import TotalCountBooksComponent from '../search-books/components/TotalCount-books.component';
import { getAllItems } from '@/utils/indexedDB';
import { SearchBookRes } from '@/types/serach-books.type';
import Paginations from '@/components/paginations';

export default function WishListBookPage() {
  const [bookList, setBookList] = useState<SearchBookRes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<string>('10');

  useEffect(() => {
    (async () => {
      const data = await getAllItems('BooksWishDB', 'wishList');
      setBookList(data as SearchBookRes[]);
    })();
  }, []);

  const handlePage = (pageSize: string) => {
    setCurrentPage(1);
    setPageSize(pageSize);
  };

  const itemsPerPage = Number(pageSize);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = bookList.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className="font-bold m-4">내가 찜한 책</div>
      <TotalCountBooksComponent title="찜한 총" count={bookList.length} />
      <BooksListComponent
        bookList={displayedBooks}
        noDataText="찜한 책이 없습니다."
      />
      {bookList && bookList.length > 0 && (
        <Paginations
          totalCount={bookList.length}
          currentPage={currentPage}
          pageSize={itemsPerPage}
          onPage={(page) => setCurrentPage(page)}
          onPageSize={(pageSize) => handlePage(pageSize)}
        />
      )}
    </div>
  );
}
