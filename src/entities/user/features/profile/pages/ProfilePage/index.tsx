import { ProfileCard } from '@/entities/user/features/profile/components/ProfileCard';
import { BoundedPage } from '@/shared/ui/BoundedPage';
import { Heading } from '@/shared/ui/Heading';

export function ProfilePage() {
  return (
    <BoundedPage maxWidth="64rem">
      <Heading>Досье</Heading>
      <ProfileCard />
    </BoundedPage>
  );
}
