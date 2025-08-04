'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/rpc';

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      console.log('Sending request to fetch current user...');
      const response = await client.api.auth.current.$get();

      if (!response.ok) {
        console.log('Failed to fetch user data:', response.status);
        return null;
      }
      const { data } = await response.json();
      console.log('Fetched user data:', data);
      return data;
    },
  });
  return query;
};
