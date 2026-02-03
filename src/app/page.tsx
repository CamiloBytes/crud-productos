"use client"
import {
    LandingNavbar,
    HeroSection,
    FeaturesSection,
    StatsSection,
    HowItWorksSection,
    TestimonialsSection,
    PricingSection,
    CTASection,
    LandingFooter
} from '@/components/landing'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
            <LandingNavbar />
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <HowItWorksSection />
            <TestimonialsSection />
            
            <CTASection />
            <LandingFooter />
        </div>
    )
}
