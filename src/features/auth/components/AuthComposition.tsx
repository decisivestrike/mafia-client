import styles from './auth-composition.module.css';
import { Separator } from '@/shared/ui';
import { Card } from '@/shared/ui/Card/Card';

import type { JSX } from 'react/jsx-runtime';

type AuthCompositionProps = {
  subtitle: 'Вход' | 'Регистрация';
  form: JSX.Element;
  hint: JSX.Element;
};

export function AuthComposition({ subtitle, form, hint }: AuthCompositionProps) {
  return (
    <main className={styles.Main}>
      <div>
        <h1 className={styles.Title}>Мафия</h1>
        <div className={styles.SubtitleContainer}>
          <div className={styles.Rule} />
          <span className={styles.Subtitle}>{subtitle}</span>
          <div className={styles.Rule} />
        </div>
      </div>
      <Card className={styles.Container}>
        {form}
        <Separator />
        <div className={styles.Hint}>{hint}</div>
      </Card>
    </main>
  );
}
