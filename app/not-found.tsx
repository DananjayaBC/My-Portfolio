export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground">
          The page you’re looking for doesn’t exist.
        </p>
      </div>
    </main>
  );
}
