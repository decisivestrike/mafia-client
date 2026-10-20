import styles from './profile-card.module.css';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileButtons } from './ProfileButtons';
import ProfileInfo from './ProfileInfo';
import { Card } from '@/shared/ui/Card';

export function ProfileCard() {
  return (
    <Card className={styles.Root}>
      <ProfileAvatar />
      <section className={styles.Section}>
        <ProfileInfo />
        <ProfileButtons />
      </section>
    </Card>
  );
}
