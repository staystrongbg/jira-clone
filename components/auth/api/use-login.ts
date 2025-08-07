'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/rpc';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<(typeof client.api.auth.login)['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth.login)['$post']>;

export const useLogin = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });
      return await response.json();
    },
    //redirect to homeppage after successful login
    onSuccess: () => {
      // Invalidate the current user query to ensure the user is logged in
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      router.push('/');
    },
  });

  return mutation;
};

// useEffect(() => {
//   query.refetch(); // Refetch the query when the component mounts
// }, [query]);
