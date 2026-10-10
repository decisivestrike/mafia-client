import { Oswald, Inter, JetBrains_Mono } from 'next/font/google';

const oswald = Oswald({
  variable: '--font-heading',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

/** Для регистрации в root layout */
export const fonts = `${oswald.variable} ${inter.variable} ${jetBrainsMono.variable}`;
