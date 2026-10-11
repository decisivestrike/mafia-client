import styles from './page.module.css';
import { ThemeToggleGroup } from '@/features/theme/components/ThemeToggleGroup';
import { Heading } from '@/shared/ui/Heading/Heading';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

export default function SettingsPage() {
  return (
    <MainPageWrapper className={styles.Wrapper}>
      <Heading>Настройки</Heading>
      <section className={styles.Grid}>
        <div>Тема</div>
        <ThemeToggleGroup />
      </section>
    </MainPageWrapper>
  );
}
