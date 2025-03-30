export default function NoData({
  className,
  text = '데이터가 없습니다.',
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-inherit ${className}`}
    >
      <img
        className="w-100"
        src="/no_data.png"
        alt="데이터가 없습니다"
        loading="lazy"
        width={150}
        height={100}
        decoding="async"
      />
      <span className="mt-2 text-sm text-stone-500">{text}</span>
    </div>
  );
}
