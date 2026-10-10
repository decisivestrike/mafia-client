import ProfileInfo from '../ProfileInfo/ProfileInfo';
import { UserAvatar } from '../UserAvatar';
import styles from './profile-card.module.css';
import { Button } from '@/shared/ui';

export function ProfileCard() {
  return (
    <div className={`${styles.Root} Card`}>
      <UserAvatar />
      <section className={styles.Section}>
        <ProfileInfo />
        <div className={styles.Actions}>
          <Button>Редактировать</Button>
          <Button variant="secondary">Выйти</Button>
        </div>
      </section>
    </div>
  );
}
