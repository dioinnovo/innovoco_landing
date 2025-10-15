export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Public layout wrapper - sections handle their own content constraints */}
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}