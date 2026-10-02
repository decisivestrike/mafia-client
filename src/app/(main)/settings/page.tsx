import { ThemeToggleGroup } from '@/features/theme/components/ThemeToggleGroup';

export default function SettingsPage() {
  return (
    <div>
      <h2 className="mb-10 text-center">Настройки</h2>
      <section className="grid grid-cols-2 items-center justify-center">
        <div>Тема</div>
        <ThemeToggleGroup />
      </section>
    </div>
  );
}
