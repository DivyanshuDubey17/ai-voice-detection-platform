'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { VoiceDetectionTool } from '@/components/voice-detection-tool'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { UseCasesSection } from '@/components/use-cases-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <VoiceDetectionTool />
        <FeaturesSection />
        <UseCasesSection />
      </main>
      <Footer />
    </div>
  )
}
