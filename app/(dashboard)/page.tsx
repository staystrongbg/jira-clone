import { getCurrentUser } from "@/components/auth/actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl">Welcome {user?.name} to Jira Clone</h1>
    </div>
  );
}
