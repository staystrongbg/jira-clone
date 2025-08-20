"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) {
        console.log("Failed to fetch user data:", response.status);
        return null;
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
