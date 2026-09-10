"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const THEME = "#35A774"

export type Testimonial = {
  id: string
  fullname: string
  username: string
  profile_img: string
  profesion: string
  company_name: string
  content: string
  fav_feature: string
  fav_service: string
  fav_feature_icon: string
  fav_service_icon: string
}

type TestimonialsCardCarouselProps = {
  items: readonly Testimonial[]
  activeIndex: number
  onChange: (index: number) => void
}

export function TestimonialsCardCarousel({
  items,
  activeIndex,
  onChange,
}: TestimonialsCardCarouselProps) {
  const [paused, setPaused] = useState(false)
  const directionRef = useRef(1) // 1 = slide right → left (forward)
  const prevIndexRef = useRef(activeIndex)
  const count = items.length

  useEffect(() => {
    const prev = prevIndexRef.current
    if (activeIndex === prev) return

    // Forward wrap or increase → slide from right to left
    const forward =
      activeIndex === (prev + 1) % count ||
      (prev === count - 1 && activeIndex === 0)
    directionRef.current = forward ? 1 : -1
    prevIndexRef.current = activeIndex
  }, [activeIndex, count])

  useEffect(() => {
    if (paused || count === 0) return
    const id = window.setInterval(() => {
      onChange((activeIndex + 1) % count)
    }, 7000)
    return () => window.clearInterval(id)
  }, [activeIndex, count, onChange, paused])

  const getItem = (offset: number) => {
    const i = (activeIndex + offset + count) % count
    return items[i]
  }

  const visible = [
    { offset: -1, item: getItem(-1) },
    { offset: 0, item: getItem(0) },
    { offset: 1, item: getItem(1) },
  ]

  const dir = directionRef.current

  return (
    <div
      className="relative h-[30vh] min-h-[180px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left / right edge masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-28 md:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-28 md:w-40"
      />

      <div className="relative z-10 flex h-full items-center justify-center overflow-hidden px-8 sm:px-16 md:px-24">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={activeIndex}
            custom={dir}
            variants={{
              enter: (d: number) => ({
                x: d > 0 ? 120 : -120,
                opacity: 0,
              }),
              center: {
                x: 0,
                opacity: 1,
              },
              exit: (d: number) => ({
                x: d > 0 ? -120 : 120,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6"
          >
            {visible.map(({ offset, item }) => {
              const isActive = offset === 0
              return (
                <motion.button
                  key={`${item.id}-${offset}`}
                  type="button"
                  whileHover={{ scale: isActive ? 1.02 : 1.01 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    if (offset === -1)
                      onChange((activeIndex - 1 + count) % count)
                    if (offset === 1) onChange((activeIndex + 1) % count)
                    if (offset === 0) return
                  }}
                  className={[
                    "flex w-[min(100%,280px)] shrink-0 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors sm:w-[300px] sm:gap-3.5 sm:px-5 sm:py-3.5",
                    isActive
                      ? "border-[#35A774] bg-[#141414] shadow-[0_0_0_1px_rgba(53,167,116,0.35),0_8px_30px_rgba(0,0,0,0.45)]"
                      : "border-transparent bg-transparent hover:border-[#35A774]/40",
                  ].join(" ")}
                  style={
                    isActive
                      ? { borderColor: THEME }
                      : undefined
                  }
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.profile_img}
                    alt={item.fullname}
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="truncate text-[14px] font-semibold !text-[#ededed] sm:text-[15px]">
                        {item.fullname}
                      </span>
                      <span className="truncate text-[12px] !text-[#71717a] sm:text-[13px]">
                        {item.username}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[12px] !text-[#a1a1a1] sm:text-[13px]">
                      {item.profesion}
                      {item.company_name ? ` · ${item.company_name}` : ""}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
