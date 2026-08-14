"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Statistics",
      href: "/statistics",
    },
    {
      label: "Attack History",
      href: "/attacks",
    },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-wider text-white transition hover:text-red-400"
        >
          War Cost Tracker
        </Link>

        <nav className="hidden gap-8 text-gray-300 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition ${
                  isActive
                    ? "text-red-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}

                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-red-400" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}