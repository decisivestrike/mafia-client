import { User, Gamepad2, Settings } from 'lucide-react';

export const navItems = [
  { icon: User, label: 'Профиль', path: '/profile' as const },
  { icon: Gamepad2, label: 'Игры', path: '/games' as const },
  { icon: Settings, label: 'Настройки', path: '/settings' as const },
] as const;

export function isActiveItem(pathname: string, path: string): boolean {
  return pathname === path || (path === '/games' && pathname.startsWith('/game'));
}
