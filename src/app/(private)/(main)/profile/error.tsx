'use client';

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <p>{error.message}</p>
      <button onClick={retry}>Try again</button>
    </div>
  );
}
