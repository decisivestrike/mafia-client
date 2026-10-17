import { ThemeSection } from '../components/ThemeSection';
import { BoundedPage } from '@/shared/ui/BoundedPage/BoundedPage';
import { Heading } from '@/shared/ui/Heading/Heading';

export function SettingsPage() {
  return (
    <BoundedPage maxWidth="48rem">
      <Heading>Настройки</Heading>
      <ThemeSection />
    </BoundedPage>
  );
}
