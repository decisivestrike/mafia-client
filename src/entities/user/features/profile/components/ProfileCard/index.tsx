import styles from './profile-card.module.css';
import { ProfileButtons } from './ProfileButtons';
import ProfileInfo from './ProfileInfo';
import { UserAvatar } from '@/entities/user/components/UserAvatar';
import { Card } from '@/shared/ui/Card';

export function ProfileCard() {
  return (
    <Card className={styles.Root}>
      <UserAvatar />
      <section className={styles.Section}>
        <ProfileInfo />
        <ProfileButtons />
      </section>
    </Card>
  );
}
