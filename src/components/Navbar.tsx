export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold tracking-wider text-white">
          War Cost Tracker
        </h1>

        <nav className="hidden md:flex gap-8 text-gray-300">
          <a href="#" className="hover:text-white transition">
            Home
          </a>

          <a href="#" className="hover:text-white transition">
            Statistics
          </a>

          <a href="#" className="hover:text-white transition">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}