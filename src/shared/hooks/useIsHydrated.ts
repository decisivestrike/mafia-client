import { useEffect, useState } from 'react';

export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
