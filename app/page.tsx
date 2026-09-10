import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
// import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"
import { CompanyMarquee } from "@/components/landing/company-marquee"
import { Testimonials } from "@/components/landing/testimonials"
import { ContactLayout } from "@/components/landing/contact-layout"
import { PageFrame } from "@/components/landing/page-frame"
import { Footer } from "@/components/landing/footer"

export default async function LandingPage() {
  const user = await getCurrentUser()
  if (user) redirect("/dashboard")

  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <div className="overflow-x-clip">
        <Hero />
      </div>

      {/* One continuous frame for marquee + features */}
      <PageFrame className="items-stretch">
        <CompanyMarquee />
        <Features />
      </PageFrame>

      {/* Closing CTA */}
      <section className="relative mx-auto max-w-6xl bg-black px-6 pb-28 pt-20 text-center">
        <h2 className="text-[1.6rem] font-semibold tracking-[-0.02em] !text-[#ededed]">
          Run your next content cycle in Spool.
        </h2>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-[#ededed] px-5 py-2.5 text-[14px] font-medium !text-[#0a0a0a] transition-colors hover:bg-white"
        >
          Sign in
        </Link>
      </section>

      <Testimonials />

      <ContactLayout />

      <Footer />
    </main>
  )
}
