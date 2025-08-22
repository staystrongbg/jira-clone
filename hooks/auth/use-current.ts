"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { UseQueryResult } from "@tanstack/react-query";
import { Models } from "node-appwrite";

export const useCurrentUser =
  (): UseQueryResult<Models.User<Models.Preferences> | null> => {
    return useQuery({
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
  };
