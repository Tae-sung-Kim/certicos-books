import { SearchBookRes } from '@/types/serach-books.type';

export default function BooksDetailComponent({
  book,
}: {
  book: SearchBookRes;
}) {
  const decodeHtml = (text: string) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent ?? '';
  };

  return (
    <div className="p-4 border-t bg-gray-50">
      <div className="flex space-x-4">
        <img
          className="w-32 h-48 object-cover rounded"
          src={book.thumbnail || '/empty-book.png'}
          alt={book.title}
        />
        <div className="flex-1">
          <p className="text-gray-700 mb-4 leading-7">
            {decodeHtml(book.contents)}
          </p>
          <div className="space-y-2">
            <InfoItem
              label="출간일"
              value={new Date(book.datetime).toLocaleDateString()}
            />
            <InfoItem label="저자" value={book.authors.join(', ')} />
            {book.translators.length > 0 && (
              <InfoItem label="번역" value={book.translators.join(', ')} />
            )}
            <InfoItem label="출판사" value={book.publisher} />
            <InfoItem label="교재 상태" value={book.status} />
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

export const InfoItem = ({
  className,
  label,
  value,
}: {
  className?: string;
  label: string;
  value: string;
}) => {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
};
