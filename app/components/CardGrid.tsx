export default function CardGrid({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}