import Header from '../components/Header'
import Hero from '../components/Hero'
import StatsSection from '../components/StatsSection'
import WhatSection from '../components/WhatSection'
import WhySection from '../components/WhySection'
import HowItWorks from '../components/HowItWorks'
import CaseStudy from '../components/CaseStudy'
import Gallery from '../components/Gallery'
import FAQSection from '../components/FAQSection'
import TestimonialsSection from '../components/TestimonialsSection'

import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import FloatingSupport from '../components/FloatingSupport'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CaseStudy />
      <Gallery isHomePage={true} />
      <StatsSection />
      <WhatSection />
      <WhySection />
      <HowItWorks />

      <TestimonialsSection />
      <FAQSection />
      <CallToAction />
      <Footer />
      <FloatingSupport />
    </div>
  )
}
