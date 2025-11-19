export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Pet Services Platform</h1>
        <p className="text-muted-foreground">Multi-tenant SaaS for pet service businesses</p>
        <div className="flex gap-4">
          <a
            href="/sign-in"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Sign In
          </a>
          <a
            href="/sign-up"
            className="rounded-md border border-border px-4 py-2 hover:bg-accent"
          >
            Sign Up
          </a>
        </div>
      </main>
    </div>
  );
}

