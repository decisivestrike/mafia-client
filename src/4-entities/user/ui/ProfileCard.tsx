'use client';

import { Button, Spinner } from '@shared/components';
import { Stamp } from '@shared/components/Stamp';
import { useQuery } from '@tanstack/react-query';
import { profileInfoOptions } from '../api/get-profile-info';
import ProfileInfo from './ProfileInfo';
import { UserAvatar } from './UserAvatar';

export function ProfileCard() {
  const { data, error, isPending, isError } = useQuery(profileInfoOptions);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex min-w-156 flex-row gap-4 border p-5">
      <UserAvatar name={data.name} />
      <section className="flex w-full flex-col gap-4 p-2">
        <ProfileInfo user={data} />
        <div className="flex items-center justify-between">
          <Button>Редактировать</Button>
          <Stamp className="relative top-2 left-2 mt-2" />
        </div>
      </section>
    </div>
  );
}
