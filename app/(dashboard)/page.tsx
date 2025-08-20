import { getCurrentUser } from "@/actions";
import { CreateWorkspaceForm } from "@/components/workspaces/create-workspace-form";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <CreateWorkspaceForm />
    </div>
  );
}
