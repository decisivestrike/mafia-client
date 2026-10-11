import styles from './page.module.css';
import { ProfileCard } from '@/entities/user/components/ProfileCard/ProfileCard';
import { Heading } from '@/shared/ui/Heading/Heading';

export default function ProfilePage() {
  return (
    <div className={styles.Wrapper}>
      <Heading>Досье</Heading>
      <ProfileCard />
    </div>
  );
}
