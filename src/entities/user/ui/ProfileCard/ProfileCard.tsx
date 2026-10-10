import styles from './profile-card.module.css';
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';
import { ProfileButtons } from './ProfileButtons/ProfileButtons';
import ProfileInfo from './ProfileInfo/ProfileInfo';

export function ProfileCard() {
  return (
    <div className={`${styles.Root} Card`}>
      <ProfileAvatar />
      <section className={styles.Section}>
        <ProfileInfo />
        <ProfileButtons />
      </section>
    </div>
  );
}
