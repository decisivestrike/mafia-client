import { ThemeSection } from '../components/ThemeSection';
import styles from './settings-page.module.css';
import { Heading } from '@/shared/ui/Heading/Heading';

export function SettingsPage() {
  return (
    <div className={styles.Wrapper}>
      <Heading>Настройки</Heading>
      <ThemeSection />
    </div>
  );
}
