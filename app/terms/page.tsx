import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Gavel } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | VoiceDetect',
  description: 'Read our terms and conditions',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Agreement */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service constitute a legal agreement between you and VoiceDetect
                regarding your use of our services. By accessing or using VoiceDetect, you agree to
                be bound by these terms. If you do not agree to abide by the above, please do not
                use this service.
              </p>
            </Card>

            {/* Use License */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Permission is granted to temporarily download one copy of the materials
                  (information or software) on VoiceDetect for personal, non-commercial transitory
                  viewing only. This is the grant of a license, not a transfer of title, and under
                  this license you may not:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose or for any public display</li>
                  <li>Attempting to decompile or reverse engineer any software contained on the site</li>
                  <li>Removing any copyright or other proprietary notations from the materials</li>
                  <li>Transferring the materials to another person or "mirroring" the materials</li>
                  <li>Using the materials for any illegal purpose or in violation of any laws</li>
                </ul>
              </div>
            </Card>

            {/* Disclaimer */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The materials on VoiceDetect are provided on an 'as is' basis. VoiceDetect makes
                  no warranties, expressed or implied, and hereby disclaims and negates all other
                  warranties including, without limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or non-infringement of
                  intellectual property or other violation of rights.
                </p>
                <p>
                  While we strive to provide accurate detection results, VoiceDetect does not
                  guarantee 100% accuracy. Results should be used as a tool to assist in decision
                  making, not as definitive proof.
                </p>
              </div>
            </Card>

            {/* Limitations of Liability */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Limitations of Liability</h2>
              <p className="text-muted-foreground mb-4">
                In no event shall VoiceDetect or its suppliers be liable for any damages
                (including, without limitation, damages for loss of data or profit, or due to
                business interruption) arising out of the use or inability to use the materials
                on VoiceDetect, even if VoiceDetect or an authorized representative has been
                notified orally or in writing of the possibility of such damage.
              </p>
            </Card>

            {/* Accuracy of Materials */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Accuracy of Materials</h2>
              <p className="text-muted-foreground">
                The materials appearing on VoiceDetect could include technical, typographical, or
                photographic errors. VoiceDetect does not warrant that any of the materials on the
                website are accurate, complete, or current. VoiceDetect may make changes to the
                materials contained on its website at any time without notice. VoiceDetect does not,
                however, make any commitment to update the materials.
              </p>
            </Card>

            {/* Materials and Content */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Materials and Content</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  VoiceDetect has not reviewed all of the sites linked to its website and is not
                  responsible for the contents of any such linked site. The inclusion of any link
                  does not imply endorsement by VoiceDetect of the site. Use of any such linked
                  website is at the user's own risk.
                </p>
                <p>
                  If you upload or provide audio content to VoiceDetect, you represent and warrant
                  that you have all necessary rights to the content and that its use does not
                  violate any applicable laws or regulations.
                </p>
              </div>
            </Card>

            {/* Modifications */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Modifications</h2>
              <p className="text-muted-foreground">
                VoiceDetect may revise these terms of service for its website at any time without
                notice. By using this website, you are agreeing to be bound by the then current
                version of these terms of service.
              </p>
            </Card>

            {/* Governing Law */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws
                of the jurisdiction in which VoiceDetect operates, and you irrevocably submit to the
                exclusive jurisdiction of the courts in that location.
              </p>
            </Card>

            {/* Contact */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <span className="font-mono text-primary">legal@voicedetect.app</span>
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
