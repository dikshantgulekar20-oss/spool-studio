"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const
const THEME = "#35A774"

export function Hero() {
  return (
    <section className="relative flex h-[100vh] min-h-[100vh] w-full items-center justify-center overflow-hidden bg-black">
      {/* Theme radial glow — covers full viewport behind navbar + content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${THEME}66, transparent 70%)`,
          backgroundSize: "100% 100%",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] py-1 pl-1 pr-3 text-[12px] !text-[#a1a1a1]"
        >
          <span className="rounded-full bg-[#35A774] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide !text-black">
            New
          </span>
          Ask Spool AI is here
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          className="bg-gradient-to-b from-[#ffffff] to-[#8a8a8a] bg-clip-text text-[2.6rem] font-bold leading-[1.1] tracking-[-0.03em] text-transparent sm:text-[3.4rem]"
        >
          Content operations for creative teams.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-5 max-w-xl text-[15px] leading-relaxed !text-[#a1a1a1]"
        >
          Plan, produce, review, approve, and publish client content from a
          single workspace. Built for agencies managing multiple clients with
          recurring content cycles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mt-9 flex items-center gap-3"
        >
          <Link
            href="/login"
            className="rounded-lg bg-[#ededed] px-5 py-2.5 text-[14px] font-medium !text-[#0a0a0a] transition-colors duration-150 hover:bg-white"
          >
            Sign in
          </Link>
          <a
            href="https://github.com/IntegerAlex/CMS"
            className="rounded-lg border border-[rgba(255,255,255,0.13)] px-5 py-2.5 text-[14px] !text-[#a1a1a1] transition-colors duration-150 hover:border-[rgba(255,255,255,0.25)] hover:!text-[#ededed]"
          >
            View source
          </a>
        </motion.div>
      </div>
    </section>
  )
}
