export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-2xl mx-auto p-4">
      {children}
    </div>
  );
}
