import { SearchBookRes } from '@/types/serach-books.type';

export default function BooksDetailComponent({
  book,
}: {
  book: SearchBookRes;
}) {
  return (
    <div className="p-4 border-t bg-gray-50">
      <div className="flex space-x-4">
        <img
          className="w-32 h-48 object-cover rounded"
          src={book.thumbnail}
          alt={book.title}
        />
        <div className="flex-1">
          <p className="text-gray-700 mb-4">{book.contents}</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">출간일:</span>{' '}
              {new Date(book.datetime).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">저자:</span>{' '}
              {book.authors.join(', ')}
            </p>
            {book.translators.length > 0 && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">번역:</span>{' '}
                {book.translators.join(', ')}
              </p>
            )}

            <p className="text-sm text-gray-600">
              <span className="font-semibold">출판사:</span> {book.publisher}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">교재 상태:</span> {book.status}
            </p>

            <div className="flex items-center space-x-2">
              {book.sale_price ? (
                <>
                  <span className="text-gray-400 line-through">
                    원가: {book.price.toLocaleString()}원
                  </span>
                  <span className="font-semibold text-red-600">
                    할인가: {book.sale_price.toLocaleString()}원
                  </span>
                </>
              ) : (
                <span className="font-semibold">
                  원가: {book.price.toLocaleString()}원
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
