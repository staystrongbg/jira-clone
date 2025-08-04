'use client';

import { useMutation } from '@tanstack/react-query';
import { client } from '@/lib/rpc';
import { InferResponseType } from 'hono';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate the current user query to ensure the user is logged out
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      //redirect to the login page or home page
      router.push('/sign-in');
    },
  });

  return mutation;
};
