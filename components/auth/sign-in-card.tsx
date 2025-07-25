import { Card, CardHeader, CardTitle } from '../ui/card';

export const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-[487ox] shadow-none border-none">
      <CardHeader className="flex flex-col items-center justify-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2"></div>
    </Card>
  );
};
