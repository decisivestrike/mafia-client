import { useQuery } from '@tanstack/react-query';
import { getProfileInfo } from '../api/get-profile-info';

export function useProfileInfo() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileInfo,
  });
}
