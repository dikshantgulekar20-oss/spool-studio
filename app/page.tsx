import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Navbar } from "@/components/landing/navbar"
import { Testimonials } from "@/components/landing/testimonials"
import { ContactLayout } from "@/components/landing/contact-layout"
import { Footer } from "@/components/landing/footer"

export default async function LandingPage() {
  const user = await getCurrentUser()
  if (user) redirect("/dashboard")

  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <ContactLayout />
      <Footer />
    </main>
  )
}
