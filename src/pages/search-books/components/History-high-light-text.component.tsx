interface HistoryHighLightTextProps {
  text: string;
  query: string;
}

export default function HistoryHighLightText({
  text,
  query,
}: HistoryHighLightTextProps) {
  if (!query) return <>{text}</>;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const regex = new RegExp(`(${escapedQuery})`, 'gi');

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="font-semibold text-blue-600">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
