import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-wider text-white"
        >
          War Cost Tracker
        </Link>

        <nav className="hidden gap-8 text-gray-300 md:flex">
          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/statistics"
            className="transition hover:text-white"
          >
            Statistics
          </Link>

          <Link
            href="/attacks"
            className="transition hover:text-white"
          >
            Attack History
          </Link>
        </nav>
      </div>
    </header>
  );
}