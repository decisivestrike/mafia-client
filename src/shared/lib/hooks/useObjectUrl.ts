import { useEffect, useState } from 'react';

/** Создаёт object URL для Blob и освобождает его при изменении или размонтировании */
export function useObjectUrl(blob: Blob | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (blob === null || blob === undefined) {
      // oxlint-disable-next-line react/set-state-in-effect
      setUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(blob);
    // oxlint-disable-next-line react/set-state-in-effect
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [blob]);

  return url;
}
