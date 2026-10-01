// 'use client';

// import { Switch } from '@base-ui/react';
// import { useAtom } from 'jotai';
// import { themeAtom } from '../state';

// export function ThemeToggle() {
//   const [theme, setTheme] = useAtom(themeAtom);

//   return (
//     <Switch.Root
//       value={theme}
//       checked={theme === 'dark'}
//       // oxlint-disable-next-line react-perf/jsx-no-new-function-as-prop
//       onCheckedChange={checked => {
//         setTheme(checked ? 'dark' : 'light');
//       }}
//       className="flex h-5 w-9 shrink-0 border border-neutral-950 bg-white p-0.5 transition-colors duration-150 ease-[ease] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 data-checked:bg-neutral-950 dark:border-white dark:bg-neutral-950 dark:focus-visible:outline-white dark:data-checked:bg-white"
//     >
//       <Switch.Thumb className="size-3.5 bg-neutral-950 transition-[translate,background-color] duration-150 ease-[ease] data-checked:translate-x-4 data-checked:bg-white dark:bg-white dark:data-checked:bg-neutral-950" />
//     </Switch.Root>
//   );
// }
