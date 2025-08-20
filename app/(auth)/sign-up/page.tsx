import { getCurrentUser } from "@/actions";
import { SignUpCard } from "@/components/auth/sign-up/sign-up-card";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await getCurrentUser();

  if (user) {
    // If the user is already authenticated, redirect to the home page
    return redirect("/");
  }
  return <SignUpCard />;
}
