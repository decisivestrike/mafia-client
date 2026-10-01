'use client';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Все сломалось!</h2>
        <p>{error.message}</p>
        <button onClick={retry}>Try again</button>
      </body>
    </html>
  );
}
