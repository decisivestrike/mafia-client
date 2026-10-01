import { Oswald, Inter, JetBrains_Mono } from 'next/font/google';

export const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});
