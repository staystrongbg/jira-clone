"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces.$post({ json });
      return await response.json();
    },
    //redirect to workspace after successful login
    onSuccess: () => {
      toast.success("Workspace created successfully");
      // Invalidate the current user query to ensure the user is logged in
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.push("/workspaces");
    },
    onError: () => {
      toast.error("Failed to create workspace");
    },
  });

  return mutation;
};
