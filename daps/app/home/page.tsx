import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center text-foreground">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Home</h1>
      <p className="max-w-2xl text-foreground/75">
        Welcome to DAPS, your Dayananda Sagar App Store landing page.
      </p>
      <Link href="/" className="text-sm underline underline-offset-4 text-foreground/80">
        Back to Splash
      </Link>
    </main>
  );
}
