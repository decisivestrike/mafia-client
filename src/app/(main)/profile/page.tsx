import styles from './page.module.css';
import { ProfileCard } from '@/entities/user/ui/ProfileCard/ProfileCard';
import { Separator } from '@/shared/ui';

export default function ProfilePage() {
  return (
    <div className={styles.OuterWrapper}>
      <div className={styles.InnerWrapper}>
        <div>
          <h1 className={styles.Heading}>Досье</h1>
          <Separator className={styles.Separator} />
        </div>
        <ProfileCard />
      </div>
    </div>
  );
}
