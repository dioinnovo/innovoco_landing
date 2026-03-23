export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Div (not main) so routes can declare a single <main id="main-content"> without nesting. */}
      <div className="min-h-screen">{children}</div>
    </>
  );
}