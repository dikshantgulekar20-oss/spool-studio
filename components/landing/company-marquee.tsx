const COMPANIES = [
  {
    name: "Expensify",
    logo: "https://cdn.simpleicons.org/expensify/ffffff",
  },
  {
    name: "GEICO",
    logo: "https://www.google.com/s2/favicons?domain=geico.com&sz=128",
  },
  {
    name: "TED",
    logo: "https://cdn.simpleicons.org/ted/ffffff",
  },
  {
    name: "Brex",
    logo: "https://cdn.simpleicons.org/brex/ffffff",
  },
  {
    name: "Zoom",
    logo: "https://cdn.simpleicons.org/zoom/ffffff",
  },
  {
    name: "HubSpot",
    logo: "https://cdn.simpleicons.org/hubspot/ffffff",
  },
] as const

export function CompanyMarquee() {
  return (
    <section className="relative z-10 w-full bg-black pt-16 pb-10 sm:pt-20 sm:pb-12 md:pt-24">
      <div className="px-4 py-2 sm:px-6">
        <h2 className="mb-8 text-center text-[15px] font-medium leading-snug tracking-[-0.01em] !text-[#35A774] sm:mb-10 sm:text-[16px] md:text-[17px]">
          Trusted by the most innovative companies in the world
        </h2>

        <div className="w-full overflow-visible border-2 border-white">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {COMPANIES.map((company) => (
              <li
                key={company.name}
                className="flex min-h-[100px] flex-col items-center justify-center gap-2 border border-white bg-black px-3 py-5 sm:min-h-[112px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={120}
                  height={40}
                  loading="eager"
                  decoding="async"
                  className="h-8 w-auto max-w-[110px] object-contain sm:h-9 md:h-10"
                />
                <span className="text-center text-[12px] font-medium !text-white sm:text-[13px]">
                  {company.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
