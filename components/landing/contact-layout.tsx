"use client"

import { ContactForm } from "@/components/landing/contact-form"
import { ContactLottie } from "@/components/landing/contact-lottie"

export function ContactLayout() {
  return (
    <section
      id="contact"
      className="relative w-screen max-w-[100vw] scroll-mt-28 overflow-x-clip bg-black py-12 sm:py-16 lg:py-20"
    >
      <div className="mb-8 w-full px-[5vw] text-center sm:mb-10 lg:mb-12">
        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] !text-[#35A774]">
          Contact
        </p>
        <h2 className="text-[1.6rem] font-semibold tracking-[-0.02em] !text-[#ededed] sm:text-[1.85rem]">
          Let&apos;s talk about your next cycle
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed !text-[#a1a1a1] sm:text-[15px]">
          Reach out for demos, partnerships, or anything Spool-related.
        </p>
      </div>

      {/* Full-bleed split: 45vw + 45vw, remaining 10vw as gutters/gap */}
      <div className="flex w-screen max-w-[100vw] flex-col items-stretch gap-8 px-[2.5vw] lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        {/* Left — 45vw / 80vh lottie */}
        <div className="flex h-[50vh] w-full items-center justify-center lg:h-[80vh] lg:w-[45vw] lg:shrink-0">
          <ContactLottie className="h-full w-full" />
        </div>

        {/* Right — 45vw form */}
        <div className="flex w-full items-center lg:w-[45vw] lg:shrink-0">
          <ContactForm className="w-full" />
        </div>
      </div>
    </section>
  )
}
