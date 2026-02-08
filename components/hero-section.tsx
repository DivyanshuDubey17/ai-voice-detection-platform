'use client';

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Detection</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Detect AI-Generated Voices with
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Precision</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Advanced machine learning analysis for detecting synthetic voices across Tamil, English, Hindi, Malayalam, and Telugu. Get instant results with confidence scores and detailed explanations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Detecting <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-t border-b border-border/50">
            <div>
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">&lt;1s</div>
              <div className="text-sm text-muted-foreground">Detection Speed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
