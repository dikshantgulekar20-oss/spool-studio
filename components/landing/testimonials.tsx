"use client"

import { motion } from "framer-motion"

const EASE = [0.25, 0.1, 0.25, 1] as const

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "From draft to approval, everything lives in one place — and the client portal means zero login friction.",
    name: "Mariana Castilho",
    role: "Creative Director",
    company: "Halcyon Studio",
  },
  {
    quote:
      "Our weekly reel cycle finally became predictable. We see blockers before publish day instead of finding out in Slack.",
    name: "Reece Atkinson",
    role: "Producer",
    company: "Northframe",
  },
  {
    quote:
      "Version history ended the final_final_v3 chaos. Clients comment on the right file, every time.",
    name: "Oliur Rahman",
    role: "Designer",
    company: "Pixel & Co",
  },
  {
    quote:
      "Ask Spool AI moves assets to review and checks approvals in seconds. It replaced half my board-diving.",
    name: "Sara Nguyen",
    role: "Agency Lead",
    company: "Novena Media",
  },
  {
    quote:
      "Calendar overlays for contracts and publish dates keep multi-client months sane.",
    name: "Jordan Blake",
    role: "Content Strategist",
    company: "Brightloop",
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function Testimonials() {
  return (
    <section id="about" className="w-full scroll-mt-24 border-t border-[rgba(255,255,255,0.08)] bg-black">
      <div className="w-full px-6 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24">
        <p className="font-mono text-[12px] tracking-[0.14em] !text-[#35A774]">
          Field notes
        </p>
        <h2 className="mt-3 max-w-xl font-mono text-[1.75rem] font-bold leading-tight !text-[#ededed] sm:text-[2.25rem]">
          Teams that ship every week.
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.08)] sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: EASE, delay: (i % 3) * 0.06 }}
              className="flex flex-col bg-black p-6"
            >
              <blockquote className="flex-1 text-[14px] leading-relaxed !text-[#cfcfcf]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(53,167,116,0.12)] font-mono text-[12px] font-bold !text-[#5FBD91]"
                >
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-[13px] font-medium !text-[#ededed]">
                    {t.name}
                  </span>
                  <span className="block text-[12px] !text-[#71717a]">
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
