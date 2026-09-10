"use client"

import { Lottie } from "lottie-react"
import { cn } from "@/lib/utils"

type ContactLottieProps = {
  className?: string
}

export function ContactLottie({ className }: ContactLottieProps) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <Lottie
        src="/lottie/contact-lottie.json"
        autoplay
        loop
        className="h-full w-full object-contain"
      />
    </div>
  )
}
