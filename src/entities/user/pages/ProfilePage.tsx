import styles from './profile-page.module.css';
import { ProfileCard } from '@/entities/user/components/ProfileCard/ProfileCard';
import { Heading } from '@/shared/ui/Heading/Heading';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

export function ProfilePage() {
  return (
    <MainPageWrapper className={styles.Wrapper}>
      <Heading>Досье</Heading>
      <ProfileCard />
    </MainPageWrapper>
  );
}
