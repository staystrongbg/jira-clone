"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.signup)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.signup)["$post"]>;

export const useRegister = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signup.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Register successful");
      // Invalidate the current user query to ensure the user is logged in
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to register");
    },
  });

  return mutation;
};
