import { Card } from '@/components/ui/card'
import {
  Zap,
  Globe,
  Lock,
  BarChart3,
  Code2,
  Clock,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get results in under 1 second with our optimized ML model',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Detect AI voices across Tamil, English, Hindi, Malayalam & Telugu',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Audio files are automatically deleted after analysis. No data retention.',
  },
  {
    icon: BarChart3,
    title: 'High Accuracy',
    description: '98% accuracy rate with detailed confidence scoring',
  },
  {
    icon: Code2,
    title: 'Easy Integration',
    description: 'Simple REST API with comprehensive documentation',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Reliable service with 99.9% uptime guarantee',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need for accurate AI voice detection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 border border-border/50 hover:border-primary/50 transition hover:shadow-lg"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
