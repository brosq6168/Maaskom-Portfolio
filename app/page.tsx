import dynamic from "next/dynamic"
import { Suspense } from "react"
import Hero from "@/components/hero"
import { ModeToggle } from "@/components/mode-toggle"
import MobileNav from "@/components/mobile-nav"
import Footer from "@/components/footer"
import IntersectionObserver from "@/components/performance/intersection-observer"

// Lazy load non-critical components
const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <SectionSkeleton title="Project Showcase" />,
  ssr: true,
})

const OngoingProjects = dynamic(() => import("@/components/ongoing-projects"), {
  loading: () => <SectionSkeleton title="Ongoing Projects" />,
  ssr: true,
})

const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <SectionSkeleton title="Skills & Tools" />,
  ssr: true,
})

const About = dynamic(() => import("@/components/about"), {
  loading: () => <SectionSkeleton title="About Me" />,
  ssr: true,
})

const DesignProcess = dynamic(() => import("@/components/placeholder-section"), {
  loading: () => <SectionSkeleton title="My Design Process" />,
  ssr: true,
})

const FeaturedWork = dynamic(() => import("@/components/featured-work"), {
  loading: () => <SectionSkeleton title="Featured Work" />,
  ssr: true,
})

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <SectionSkeleton title="What People Say" />,
  ssr: true,
})

const ReviewsWithPlaceholder = dynamic(() => import("@/components/reviews-with-placeholder"), {
  loading: () => <SectionSkeleton title="Client Reviews" />,
  ssr: true,
})

const Quotations = dynamic(() => import("@/components/quotations"), {
  loading: () => <SectionSkeleton title="Request a Quotation" />,
  ssr: true,
})

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <SectionSkeleton title="Contact Me" />,
  ssr: true,
})

// Skeleton loader for sections
function SectionSkeleton({ title }: { title: string }) {
  return (
    <section className="py-20 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
          <div className="h-4 bg-gray-800 rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-5 right-5 z-50">
        <ModeToggle />
      </div>
      <MobileNav />

      {/* Hero section is critical, load immediately */}
      <Hero />

      {/* Lazy load other sections as they come into view */}
      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="Ongoing Projects" />}>
          <OngoingProjects />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="Project Showcase" />}>
          <Projects />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="Skills & Tools" />}>
          <Skills />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="About Me" />}>
          <About />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="My Design Process" />}>
          <DesignProcess
            title="My Design Process"
            description="This section will showcase your systematic approach to creating impactful solutions. Add your design process through the admin dashboard."
            adminPath="/admin/design-process"
          />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="Featured Work" />}>
          <FeaturedWork />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="What People Say" />}>
          <Testimonials />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="Client Reviews" />}>
          <ReviewsWithPlaceholder />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="Request a Quotation" />}>
          <Quotations />
        </Suspense>
      </IntersectionObserver>

      <IntersectionObserver rootMargin="200px">
        <Suspense fallback={<SectionSkeleton title="Contact Me" />}>
          <Contact />
        </Suspense>
      </IntersectionObserver>

      <Footer />
    </main>
  )
}

