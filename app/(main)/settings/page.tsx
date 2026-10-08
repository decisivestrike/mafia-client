import { ThemeToggleGroup } from '@features/theme/components/ThemeToggleGroup';
import styles from './page.module.css';

export default function SettingsPage() {
  return (
    <div>
      <h2 className={styles.Title}>Настройки</h2>
      <section className={styles.Grid}>
        <div>Тема</div>
        <ThemeToggleGroup />
      </section>
    </div>
  );
}
