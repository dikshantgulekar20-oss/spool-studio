"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github } from "lucide-react"

const EASE = [0.25, 0.1, 0.25, 1] as const
const THEME = "#35A774"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[rgba(255,255,255,0.08)] bg-black">
      {/* Theme radial glow — single accent behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${THEME}66, transparent 70%)`,
          backgroundSize: "100% 100%",
        }}
      />

      <div className="relative z-10 w-full px-6 pb-16 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pt-40 xl:px-24">
        <div className="max-w-3xl">
          <motion.a
            href="#product"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] py-1 pl-1 pr-3 text-[12px] !text-[#a1a1a1] transition-colors hover:border-[rgba(95,189,145,0.4)]"
          >
            <span className="rounded-full bg-[#35A774] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide !text-black">
              New
            </span>
            Ask Spool AI is here
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
            className="bg-gradient-to-b from-[#ffffff] to-[#8a8a8a] bg-clip-text font-mono text-[2.2rem] font-bold leading-[1.15] tracking-[-0.01em] text-transparent sm:text-[2.9rem]"
          >
            Your content ops, on your infrastructure.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed !text-[#a1a1a1]"
          >
            Plan, review, approve, and publish client content from one
            workspace. Open source (AGPL-3.0) — self-host it free, or have us
            host and integrate it for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://github.com/IntegerAlex/spool-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ededed] px-6 py-2.5 text-[14px] font-medium !text-[#0a0a0a] transition-colors duration-150 hover:bg-white"
            >
              <Github className="h-4 w-4" />
              Star on GitHub
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.13)] px-6 py-2.5 text-[14px] !text-[#a1a1a1] transition-colors duration-150 hover:border-[rgba(255,255,255,0.25)] hover:!text-[#ededed]"
            >
              We host it for you
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
