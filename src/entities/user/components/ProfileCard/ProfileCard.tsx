import styles from './profile-card.module.css';
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';
import { ProfileButtons } from './ProfileButtons/ProfileButtons';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { Card } from '@/shared/ui/Card/Card';

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
