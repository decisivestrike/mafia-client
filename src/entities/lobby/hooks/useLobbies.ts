import { useQuery } from '@tanstack/react-query';
import { getLobbies } from '../api/get-lobbies';

export function useLobbies() {
  return useQuery({
    queryKey: ['lobbies'],
    queryFn: getLobbies,
  });
}
