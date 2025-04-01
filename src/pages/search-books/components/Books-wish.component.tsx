import { Button } from '@/components/ui/button';
import { TbJewishStar, TbJewishStarFilled } from 'react-icons/tb';
import { SearchBookRes } from '@/types/serach-books.type';
import { useState, useEffect } from 'react';
import { addItem, removeItem, getItem } from '@/utils/indexedDB';

export default function BooksWishComponent({ book }: { book: SearchBookRes }) {
  const [isWished, setIsWished] = useState(false);

  const handleBookWish = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isWished) {
      await removeItem('BooksWishDB', 'wishList', book.isbn);
    } else {
      await addItem('BooksWishDB', 'wishList', { ...book, id: book.isbn });
    }
    setIsWished(!isWished);
  };

  useEffect(() => {
    const checkWishStatus = async () => {
      const status = await getItem('BooksWishDB', 'wishList', book.isbn);
      setIsWished(!!status);
    };
    checkWishStatus();
  }, [book.isbn]);

  return (
    <Button
      onClick={handleBookWish}
      className="cursor-pointer"
      variant="outline"
    >
      {isWished ? (
        <TbJewishStarFilled className="mr-2" color="red" />
      ) : (
        <TbJewishStar className="mr-2" />
      )}
    </Button>
  );
}
