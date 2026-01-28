import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Headphones,
  Shield,
  Podcast,
  Radio,
  Users,
  FileText,
} from 'lucide-react'

const USE_CASES = [
  {
    icon: Shield,
    title: 'Content Verification',
    description: 'Verify the authenticity of voice content before publishing or distribution',
    tags: ['Media', 'Publishing'],
  },
  {
    icon: Podcast,
    title: 'Podcast & Media',
    description: 'Detect synthetic voices in podcasts, videos, and digital media platforms',
    tags: ['Broadcasting', 'Social Media'],
  },
  {
    icon: Radio,
    title: 'Audio Analytics',
    description: 'Analyze audio archives and content databases for synthetic voice detection',
    tags: ['Analytics', 'Archive'],
  },
  {
    icon: Users,
    title: 'User Verification',
    description: 'Prevent voice spoofing and deepfake attacks in authentication systems',
    tags: ['Security', 'Identity'],
  },
  {
    icon: Headphones,
    title: 'Quality Control',
    description: 'Ensure quality standards in voice-based services and applications',
    tags: ['Quality', 'Enterprise'],
  },
  {
    icon: FileText,
    title: 'Compliance',
    description: 'Meet regulatory requirements for authentic voice content verification',
    tags: ['Compliance', 'Legal'],
  },
]

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how VoiceDetect can protect your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((useCase, index) => {
            const Icon = useCase.icon
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
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {useCase.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
