import { useState } from 'react';
import NoData from '@/components/no-data';
import { SearchBookRes } from '@/types/serach-books.type';
import { Button } from '@/components/ui/button';
import BooksDetailComponent from './Books-detail.component';

export default function BooksListComponent({
  bookList,
  noDataText = '검색된 결과가 없습니다.',
}: {
  bookList: SearchBookRes[];
  noDataText?: string;
}) {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  // 상세보기
  const handleBookClick = (isbn: string) => {
    setSelectedBook(selectedBook === isbn ? null : isbn);
  };

  return (
    <div className="space-y-4">
      {bookList?.length > 0 ? (
        <div className="space-y-4">
          {bookList.map((book) => (
            <div
              key={book.isbn}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleBookClick(book.isbn)}
            >
              <div className="flex items-center p-4">
                {selectedBook !== book.isbn && (
                  <img
                    className="w-24 h-24 object-cover rounded"
                    src={book.thumbnail || '/empty-book.png'}
                    alt={book.title}
                  />
                )}
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  {selectedBook !== book.isbn && (
                    <>
                      <p className="text-gray-600">{book.authors.join(', ')}</p>
                      <p className="text-gray-600">{book.publisher}</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-red-600">
                          {(book.sale_price ?? book.price).toLocaleString()}원
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {selectedBook === book.isbn && (
                <BooksDetailComponent book={book} />
              )}
              <div className="m-4 flex justify-end">
                <Button
                  variant="outline"
                  className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(book.url, '_blank');
                  }}
                >
                  구매하기
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData text={noDataText} />
      )}
    </div>
  );
}
