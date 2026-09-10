import Link from "next/link"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Service", href: "/#product" },
  { label: "Contact", href: "/#contact" },
  { label: "Login", href: "/login" },
] as const

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-4 sm:pt-5">
      <nav
        className="
          pointer-events-auto
          flex w-full items-center justify-between gap-4
          rounded-full border border-white/30
          bg-[#111111]/90 px-4 py-2.5
          backdrop-blur-xl
          sm:px-6 sm:py-3
        "
        aria-label="Primary"
      >
        {/* Brand */}
        <Link
          href="/"
          className="shrink-0 font-sans text-[15px] font-bold uppercase tracking-wide !text-[#35A774] no-underline transition-opacity duration-200 hover:opacity-80 hover:no-underline"
        >
          SPOOL
        </Link>

        {/* Center links */}
        <ul className="flex items-center gap-4 sm:gap-5 md:gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="inline-block whitespace-nowrap text-[13px] font-medium !text-[#a1a1aa] no-underline transition-colors duration-200 hover:!text-white hover:no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <a
            href="https://github.com/IntegerAlex/CMS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#eeeeee] px-4 py-1.5 text-[13px] font-medium !text-black no-underline transition-colors duration-200 hover:bg-white hover:no-underline"
          >
            <AppleIcon className="h-3.5 w-3.5" />
            Download
          </a>
        </div>
      </nav>
    </header>
  )
}
