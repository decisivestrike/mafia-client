import styles from './theme-section.module.css';
import { ThemeToggleGroup } from '@/features/theme';
import { Card } from '@/shared/ui/Card/Card';

export function ThemeSection() {
  return (
    <Card className={styles.Root}>
      <h6>Тема</h6>
      <ThemeToggleGroup className={styles.ToggleGroup} />
    </Card>
  );
}
