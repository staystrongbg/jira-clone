'use client';

import { useMutation } from '@tanstack/react-query';
import { client } from '@/lib/rpc';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof client.api.auth.login)['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth.login)['$post']>;

export const useLogin = () => {
  const { mutate, isSuccess, error } = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });
      return await response.json();
    },
  });

  return { mutate, isSuccess, error };
};
