// import { useSearchBooks } from '@/queries/search.query';

import SearchBooksComponent from './components/Search-books.component';

export default function SearchBookPage() {
  // const searchData = useSearchBooks({ query: '수학' });

  // console.log(searchData);

  return (
    <div className="container">
      <SearchBooksComponent />
    </div>
  );
}
