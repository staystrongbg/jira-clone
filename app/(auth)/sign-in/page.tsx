import { getCurrentUser } from '@/components/auth/actions';
import { SignInCard } from '@/components/auth/sign-in/sign-in-card';
import { redirect } from 'next/navigation';

export default async function Signin() {
  const user = await getCurrentUser();

  if (user) {
    // If the user is already authenticated, redirect to the home page
    return redirect('/');
  }

  return <SignInCard />;
}
