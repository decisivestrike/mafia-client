import { useEffect, useState } from 'react';

/** Создаёт object URL для Blob и освобождает его при изменении или размонтировании */
export function useObjectUrl(blob: Blob | null | undefined): string | undefined {
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    if (blob === null || blob === undefined) {
      // oxlint-disable-next-line react/set-state-in-effect
      setUrl(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(blob);
    // oxlint-disable-next-line react/set-state-in-effect
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [blob]);

  return url;
}
