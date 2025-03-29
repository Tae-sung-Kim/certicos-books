type TotalCountBooksProps = {
  title?: string;
  count?: number;
};

export default function TotalCountBooksComponent({
  title = '도서 검색 결과 총',
  count = 0,
}: TotalCountBooksProps) {
  return (
    <div className="m-4">
      <div className="text-sm font-bold">
        {title} <span className="text-blue-500">{`${count}`}</span>건
      </div>
    </div>
  );
}
