"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  motion,
} from "framer-motion"
import {
  CalendarDays,
  CheckCircle2,
  Kanban,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

const THEME = "#5FBD91"
/** Fixed navbar height (padding + bar) */
const NAV_OFFSET_PX = 80
/** Extra air between navbar and sticky title */
const STICKY_GAP_PX = 12
const STICKY_TOP_PX = NAV_OFFSET_PX + STICKY_GAP_PX
/** Approx sticky block: title row + tabs */
const STICKY_BLOCK_PX = 128
const SCROLL_MARGIN_PX = STICKY_TOP_PX + STICKY_BLOCK_PX

const NAV_OFFSET = `${STICKY_TOP_PX}px`

const PRODUCT_TABS = [
  {
    id: "pipeline",
    title: "Production Pipeline",
    headline: "Move work through a clear pipeline",
    description:
      "Track every piece of client content from draft to published in one board.",
    points: [
      "Kanban stages: Draft → Review → Approval → Published",
      "Assign teammates and keep asset IDs visible",
      "Filter by client or team member",
      "Spot blockers before publish day",
    ],
    cta: "Learn more about Pipeline",
    href: "/login",
    icon: Kanban,
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Content production pipeline workspace",
  },
  {
    id: "calendar",
    title: "Calendar & Planning",
    headline: "See the whole month at a glance",
    description:
      "Plan the full content month — cycles, schedules, and publish dates in one view.",
    points: [
      "Month, week, and day views",
      "Overlay contracts, assets, and queue items",
      "Recurring events and content cycles",
      "See what's publishing this week",
    ],
    cta: "Learn more about Calendar",
    href: "/login",
    icon: CalendarDays,
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Content calendar planning",
  },
  {
    id: "approvals",
    title: "Client Review & Approvals",
    headline: "Clients review without an account",
    description:
      "Let clients review and approve assets without creating an account.",
    points: [
      "Token-based client portal — no account needed",
      "Approve, reject, or request changes",
      "Comments and full approval history",
      "Share a simple portal link for feedback",
    ],
    cta: "Learn more about Approvals",
    href: "/login",
    icon: CheckCircle2,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Team reviewing and approving creative work",
  },
  {
    id: "assets-ai",
    title: "Assets, Uploads & AI",
    headline: "Every asset — plus AI that acts",
    description:
      "One library for reels and posters, reliable uploads, and AI that runs workspace actions.",
    points: [
      "Central library with previews, versions, and comments",
      "Upload queue with progress and retry",
      "Ask Spool AI to move assets, show approvals, and more",
      "Command palette search across clients and assets",
    ],
    cta: "Learn more about Assets & AI",
    href: "/login",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Digital assets and AI creative tools",
  },
] as const

type Tab = (typeof PRODUCT_TABS)[number]

function FrameDivider({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div
        aria-hidden
        className="hidden w-[12px] shrink-0 border-x border-[#5FBD91] bg-[repeating-linear-gradient(135deg,#5FBD91_0,#5FBD91_1px,transparent_1px,transparent_5px)] lg:block"
      />
    )
  }
  return (
    <div
      aria-hidden
      className="h-[12px] w-full border-y border-[#5FBD91] bg-[repeating-linear-gradient(135deg,#5FBD91_0,#5FBD91_1px,transparent_1px,transparent_5px)]"
    />
  )
}

function TabPanel({
  tab,
  index,
  onInView,
}: {
  tab: Tab
  index: number
  onInView: (id: string) => void
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          onInView(tab.id)
        }
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.55],
        rootMargin: `-${SCROLL_MARGIN_PX}px 0px -40% 0px`,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onInView, tab.id])

  const Icon = tab.icon as LucideIcon

  return (
    <article
      ref={ref}
      id={`feature-${tab.id}`}
      style={{ scrollMarginTop: `${SCROLL_MARGIN_PX}px` }}
      className="relative z-0 overflow-hidden border-b border-[#5FBD91]/40 last:border-b-0"
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_12px_minmax(0,1.05fr)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: false,
            amount: 0.35,
            // Hide / re-trigger as content exits under the sticky header
            margin: `-${SCROLL_MARGIN_PX}px 0px -10% 0px`,
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-0 flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6, margin: `-${SCROLL_MARGIN_PX}px 0px 0px 0px` }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] !text-[#5FBD91]"
          >
            <Icon className="h-3.5 w-3.5" />
            {tab.title}
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6, margin: `-${SCROLL_MARGIN_PX}px 0px 0px 0px` }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.03em] !text-[#ededed] sm:text-[2rem] lg:text-[2.25rem]"
          >
            {tab.headline}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5, margin: `-${SCROLL_MARGIN_PX}px 0px 0px 0px` }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-md text-[14px] leading-relaxed !text-[#a1a1a1] sm:text-[15px]"
          >
            {tab.description}
          </motion.p>
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4, margin: `-${SCROLL_MARGIN_PX}px 0px 0px 0px` }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 space-y-2.5"
          >
            {tab.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-[13px] leading-snug !text-[#cfcfcf] sm:text-[14px]"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: THEME }}
                />
                {point}
              </li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5, margin: `-${SCROLL_MARGIN_PX}px 0px 0px 0px` }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={tab.href}
              className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium !text-[#5FBD91] no-underline transition-colors hover:!text-[#7fd4ad] hover:no-underline"
            >
              {tab.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <FrameDivider vertical />

        <FeatureImage
          src={tab.image}
          alt={tab.imageAlt}
          priority={index === 0}
        />
      </div>
    </article>
  )
}

function FeatureImage({
  src,
  alt,
  priority,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <div className="relative z-0 min-h-[260px] overflow-hidden border-t border-[#5FBD91]/30 bg-[#0a0a0a] sm:min-h-[340px] lg:min-h-full lg:border-t-0">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>
    </div>
  )
}

export function Features() {
  const [activeId, setActiveId] = useState<string>(PRODUCT_TABS[0].id)
  const [isStuck, setIsStuck] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [stickyHeight, setStickyHeight] = useState(STICKY_BLOCK_PX)

  const onPanelInView = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  const scrollToTab = (id: string) => {
    const el = document.getElementById(`feature-${id}`)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    setActiveId(id)
  }

  // Detect when title/tabs are stuck under the navbar
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: `-${STICKY_TOP_PX}px 0px 0px 0px`,
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Keep column mask height in sync with the real sticky block
  useEffect(() => {
    const el = stickyRef.current
    if (!el) return

    const update = () => setStickyHeight(el.getBoundingClientRect().height)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Mask stays inside the content column only — never covers PageFrame gutters
  const maskHeight = STICKY_TOP_PX + stickyHeight

  return (
    <section id="product" className="relative z-20 w-full bg-black pt-0">
      <div ref={sentinelRef} className="pointer-events-none h-px w-full" aria-hidden />

      <div className="relative">
        {/*
          Column-scoped seal (NOT fixed / NOT full viewport).
          Width follows the PageFrame center column so left/right green
          frames stay fully visible. Negative margin keeps layout stable.
        */}
        <div
          aria-hidden
          className="pointer-events-none sticky z-[39] bg-black"
          style={{
            top: 0,
            height: isStuck ? maskHeight : 0,
            marginBottom: isStuck ? -maskHeight : 0,
            backgroundColor: "#000000",
          }}
        />

        <div
          ref={stickyRef}
          className="sticky z-40 isolate border-b border-[#5FBD91]/50 bg-black [transform:translateZ(0)]"
          style={{ top: NAV_OFFSET, backgroundColor: "#000000" }}
        >
          {/* Extra flap in this column only — covers gap under the navbar */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-full bg-black"
            style={{ height: isStuck ? STICKY_TOP_PX : 0, backgroundColor: "#000000" }}
          />

          <div className="relative z-10 bg-black" style={{ backgroundColor: "#000000" }}>
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6 lg:px-10">
              <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] !text-[#ededed] sm:text-[1.85rem] lg:text-[2.1rem]">
                What Spool Does
              </h2>
              <Link
                href="/login"
                className="inline-flex w-fit shrink-0 items-center justify-center rounded-lg border border-[#5FBD91] px-4 py-2 text-[13px] font-medium !text-[#5FBD91] no-underline transition-colors hover:bg-[#5FBD91]/10 hover:!text-[#7fd4ad] hover:no-underline"
              >
                Get Trial
              </Link>
            </div>

            <nav
              aria-label="Product features"
              className="border-t border-[#5FBD91]/40 bg-black"
              style={{ backgroundColor: "#000000" }}
            >
              <ul className="flex min-w-max divide-x divide-[#5FBD91]/40 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:min-w-0 sm:grid sm:grid-cols-4 [&::-webkit-scrollbar]:hidden">
                {PRODUCT_TABS.map((tab) => {
                  const Icon = tab.icon as LucideIcon
                  const active = activeId === tab.id
                  return (
                    <li key={tab.id} className="flex">
                      <button
                        type="button"
                        onClick={() => scrollToTab(tab.id)}
                        className={[
                          "flex w-full items-center justify-center gap-2 px-4 py-3 text-[12px] font-medium transition-colors sm:py-3.5 sm:text-[13px]",
                          active
                            ? "bg-[#5FBD91]/15 !text-[#ededed]"
                            : "!text-[#a1a1a1] hover:bg-white/5 hover:!text-[#ededed]",
                        ].join(" ")}
                      >
                        <Icon
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color: active ? THEME : undefined }}
                        />
                        <span className="whitespace-nowrap">{tab.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Panels stay below sticky; isolate keeps motion transforms from painting over it */}
        <div className="relative z-0 isolate">
          {PRODUCT_TABS.map((tab, index) => (
            <TabPanel
              key={tab.id}
              tab={tab}
              index={index}
              onInView={onPanelInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
