import styles from './profile-page.module.css';
import { ProfileCard } from '@/entities/user/features/profile/components/ProfileCard';
import { Heading } from '@/shared/ui/Heading';

export function ProfilePage() {
  return (
    <div className={styles.Wrapper}>
      <Heading>Досье</Heading>
      <ProfileCard />
    </div>
  );
}
