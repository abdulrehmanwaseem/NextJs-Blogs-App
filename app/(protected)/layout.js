export default async function ProtectedPagesLayout({ children }) {
  return (
    <div className="flex justify-center py-12 max-w-screen-lg mx-auto overflow-x-hidden">
      {children}
    </div>
  );
}
