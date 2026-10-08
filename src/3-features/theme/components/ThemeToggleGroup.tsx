'use client';

import { useIsHydrated } from '@shared/lib';
import { Toggle, ToggleGroup } from '@shared/ui';
import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';

import type { Theme } from '..';

export function ThemeToggleGroup() {
  const isHydrated = useIsHydrated();
  const { theme, setTheme } = useTheme();

  const themeValue = useMemo<Theme[]>(
    () => (isHydrated ? [theme as Theme] : []),
    [theme, isHydrated],
  );

  const onThemeChange = useCallback(
    function (groupValue: Theme[]) {
      const theme: Theme | undefined = groupValue[0];

      if (theme !== undefined) {
        setTheme(theme);
      }
    },
    [setTheme],
  );

  return (
    <ToggleGroup<Theme>
      aria-label="Theme"
      value={themeValue}
      onValueChange={onThemeChange}
    >
      <Toggle<Theme>
        aria-label="Align left"
        value="dark"
        className="px-2 py-1 text-sm"
        variant="primary"
      >
        Темная
      </Toggle>
      <Toggle<Theme>
        aria-label="Align center"
        value="light"
        className="px-2 py-1 text-sm"
        variant="primary"
      >
        Светлая
      </Toggle>
      <Toggle<Theme>
        aria-label="Align right"
        value="system"
        className="px-2 py-1 text-sm"
        variant="primary"
      >
        Системная
      </Toggle>
    </ToggleGroup>
  );
}
