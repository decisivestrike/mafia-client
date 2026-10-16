import { ThemeSection } from '../components/ThemeSection';
import styles from './settings-page.module.css';
import { Heading } from '@/shared/ui/Heading/Heading';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

export function SettingsPage() {
  return (
    <MainPageWrapper className={styles.Wrapper}>
      <Heading>Настройки</Heading>
      <ThemeSection />
    </MainPageWrapper>
  );
}
