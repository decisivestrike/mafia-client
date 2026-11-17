import { ProfileEditCard } from '../../components/ProfileEditCard';
import { BoundedPage } from '@/shared/ui/BoundedPage';
import { Heading } from '@/shared/ui/Heading';

export function ProfileEditPage() {
  return (
    <BoundedPage maxWidth="48rem">
      <Heading>Редактирование</Heading>
      <ProfileEditCard />
    </BoundedPage>
  );
}
