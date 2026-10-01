'use client';

import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import { Toggle, ToggleGroup } from '@/shared/components';
import { useIsHydrated } from '@/shared/hooks';

type Theme = 'dark' | 'light' | 'system';

export function ThemeToggleGroup() {
  const isHydrated = useIsHydrated();
  const { theme, setTheme } = useTheme();

  const themeValue = theme !== undefined ? ([theme] as Theme[]) : undefined;

  const onThemeChange = useCallback(
    function (groupValue: Theme[]) {
      const theme: Theme | undefined = groupValue[0];

      if (theme !== undefined) {
        setTheme(theme);
      }
    },
    [setTheme],
  );

  if (!isHydrated) {
    return null;
  }

  return (
    <ToggleGroup<Theme>
      aria-label="Theme"
      value={themeValue}
      onValueChange={onThemeChange}
    >
      <Toggle<Theme>
        aria-label="Align left"
        value="dark"
        className="px-2 py-1"
        variant="primary"
      >
        Темная
      </Toggle>
      <Toggle<Theme>
        aria-label="Align center"
        value="light"
        className="px-2 py-1"
        variant="primary"
      >
        Светлая
      </Toggle>
      <Toggle<Theme>
        aria-label="Align right"
        value="system"
        className="px-2 py-1"
        variant="primary"
      >
        Системная
      </Toggle>
    </ToggleGroup>
  );
}
