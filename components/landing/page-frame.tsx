import type { ReactNode } from "react"

interface PageFrameProps {
  children: ReactNode
  className?: string
}

export function PageFrame({ children, className = "" }: PageFrameProps) {
  return (
    <div
      className={`
        mx-auto
        grid
        w-full
        max-w-[1500px]
        grid-cols-[12px_minmax(0,1fr)_12px]
        sm:grid-cols-[24px_minmax(0,1fr)_24px]
        lg:grid-cols-[32px_minmax(0,1fr)_32px]
        ${className}
      `}
    >
      {/* Left decorative gutter — theme frame */}
      <div
        aria-hidden="true"
        className="
          min-h-full
          self-stretch
          border-x
          border-[#5FBD91]
          bg-[repeating-linear-gradient(135deg,#5FBD91_0,#5FBD91_1px,transparent_1px,transparent_5px)]
        "
      />

      {/* Main content */}
      <div className="flex min-w-0 flex-col bg-black">{children}</div>

      {/* Right decorative gutter — theme frame */}
      <div
        aria-hidden="true"
        className="
          min-h-full
          self-stretch
          border-x
          border-[#5FBD91]
          bg-[repeating-linear-gradient(135deg,#5FBD91_0,#5FBD91_1px,transparent_1px,transparent_5px)]
        "
      />
    </div>
  )
}
