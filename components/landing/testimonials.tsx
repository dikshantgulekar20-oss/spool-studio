"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  CalendarDays,
  CheckCircle2,
  Kanban,
  LayoutGrid,
  Sparkles,
  Upload,
  type LucideIcon,
} from "lucide-react"
import {
  TestimonialsCardCarousel,
  type Testimonial,
} from "@/components/landing/testimonials-card-carousel"

const ICON_MAP: Record<string, LucideIcon> = {
  kanban: Kanban,
  calendar: CalendarDays,
  approvals: CheckCircle2,
  library: LayoutGrid,
  upload: Upload,
  ai: Sparkles,
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    fullname: "Mariana Castilho",
    username: "@mrncst",
    profile_img: "https://i.pravatar.cc/150?img=47",
    profesion: "Creative Director",
    company_name: "Halcyon Studio",
    content:
      "Spool lets our team ship client content faster. From draft to approval, everything lives in one place — and the client portal means zero login friction.",
    fav_feature: "Client Portal",
    fav_service: "Approvals",
    fav_feature_icon: "approvals",
    fav_service_icon: "library",
  },
  {
    id: "2",
    fullname: "Reece Atkinson",
    username: "@reece_ops",
    profile_img: "https://i.pravatar.cc/150?img=12",
    profesion: "Producer",
    company_name: "Northframe",
    content:
      "The production pipeline made our weekly reel cycle predictable. We finally see blockers before publish day instead of finding out in Slack.",
    fav_feature: "Production Pipeline",
    fav_service: "Calendar",
    fav_feature_icon: "kanban",
    fav_service_icon: "calendar",
  },
  {
    id: "3",
    fullname: "Oliur Rahman",
    username: "@olidesign",
    profile_img: "https://i.pravatar.cc/150?img=33",
    profesion: "Designer",
    company_name: "Pixel & Co",
    content:
      "Asset library + version history ended the 'final_final_v3' chaos. Clients comment on the right file, and we keep a clean audit trail.",
    fav_feature: "Asset Library",
    fav_service: "Uploads",
    fav_feature_icon: "library",
    fav_service_icon: "upload",
  },
  {
    id: "4",
    fullname: "Sara Nguyen",
    username: "@saran",
    profile_img: "https://i.pravatar.cc/150?img=5",
    profesion: "Agency Lead",
    company_name: "Novena Media",
    content:
      "Ask Spool AI is a real timesaver — moving assets to review or checking approvals for a client takes seconds instead of digging through boards.",
    fav_feature: "Ask Spool AI",
    fav_service: "Pipeline",
    fav_feature_icon: "ai",
    fav_service_icon: "kanban",
  },
  {
    id: "5",
    fullname: "Jordan Blake",
    username: "@jblake",
    profile_img: "https://i.pravatar.cc/150?img=68",
    profesion: "Content Strategist",
    company_name: "Brightloop",
    content:
      "Calendar overlays for contracts and publish dates keep multi-client months sane. The whole team knows what’s shipping this week.",
    fav_feature: "Calendar & Planning",
    fav_service: "Client Portal",
    fav_feature_icon: "calendar",
    fav_service_icon: "approvals",
  },
]

function FeatureBadge({
  label,
  iconKey,
}: {
  label: string
  iconKey: string
}) {
  const Icon = ICON_MAP[iconKey] ?? Sparkles
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-1.5 text-[13px] font-medium !text-[#ededed]">
      <Icon className="h-3.5 w-3.5 !text-[#35A774]" />
      {label}
    </span>
  )
}

function FavRow({
  title,
  badgeLabel,
  iconKey,
  description,
}: {
  title: string
  badgeLabel: string
  iconKey: string
  description: string
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2">
      {/* Title + badge on one line */}
      <p className="whitespace-nowrap text-[12px] !text-[#888888] sm:text-[13px]">
        {title}
      </p>
      <div className="justify-self-start">
        <FeatureBadge label={badgeLabel} iconKey={iconKey} />
      </div>
      {/* Description indented under the badge column */}
      <span aria-hidden />
      <p className="max-w-md text-[13px] leading-relaxed !text-[#a1a1a1]">
        {description}
      </p>
    </div>
  )
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = TESTIMONIALS[activeIndex]

  const handleChange = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const firstSentence = active.content.split(".")[0] + "."
  const rest = active.content.includes(".")
    ? active.content.slice(active.content.indexOf(".") + 1).trim()
    : ""

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-24 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <h2 className="max-w-2xl text-center text-[1.75rem] font-semibold tracking-[-0.03em] !text-[#ededed] sm:text-[2.25rem] md:text-[2.5rem]">
          Built for professionals like you.
        </h2>
        <p className="mt-3 text-center text-[14px] !text-[#a1a1a1] sm:text-[15px]">
          Used by seriously productive people.
        </p>
      </div>

      <div className="mt-12 sm:mt-14">
        <TestimonialsCardCarousel
          items={TESTIMONIALS}
          activeIndex={activeIndex}
          onChange={handleChange}
        />
      </div>

      {/* Detail panel */}
      <div className="mx-auto mt-10 w-full max-w-5xl sm:mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 md:grid-cols-[1fr_1px_1.15fr] md:gap-0"
          >
            {/* Left: fav feature / service — label + badge same line */}
            <div className="flex flex-col justify-center gap-8 px-1 md:pr-10">
              <FavRow
                title="Favorite Feature:"
                badgeLabel={active.fav_feature}
                iconKey={active.fav_feature_icon}
                description={`${active.fullname.split(" ")[0]} relies on ${active.fav_feature} to keep ${active.company_name}'s workflow moving.`}
              />
              <FavRow
                title="Favorite Service:"
                badgeLabel={active.fav_service}
                iconKey={active.fav_service_icon}
                description={`Pairs it with ${active.fav_service} for day-to-day production.`}
              />
            </div>

            {/* Center divider */}
            <div aria-hidden className="hidden bg-[#5FBD91]/35 md:block" />

            {/* Right: quote / content */}
            <div className="relative flex flex-col justify-center px-1 md:pl-10">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-1 -top-2 font-serif text-[4rem] leading-none !text-white/10 md:left-6"
              >
                “
              </span>
              <p className="relative text-[1.05rem] leading-relaxed sm:text-[1.15rem]">
                <span className="font-semibold !text-[#ededed]">
                  {firstSentence}
                </span>{" "}
                <span className="!text-[#a1a1a1]">{rest}</span>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
