import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | VoiceDetect',
  description: 'Learn how we protect your privacy',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Overview */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                VoiceDetect is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our voice
                detection platform.
              </p>
            </Card>

            {/* Data Collection */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Audio Files</h3>
                  <p>
                    When you upload or record audio through our platform, the audio file is
                    temporarily stored for processing only. Audio files are automatically deleted
                    after analysis is complete, typically within seconds.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                  <p>
                    We may collect non-identifying usage data such as API request counts, response
                    times, and error logs for service improvement and analytics. This data does not
                    include audio content or personal information.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Device Information</h3>
                  <p>
                    We collect standard web server logs including IP addresses, browser type, and
                    access timestamps for security and abuse prevention purposes.
                  </p>
                </div>
              </div>
            </Card>

            {/* Data Retention */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Audio Deletion Policy</h3>
                  <p>
                    All uploaded or recorded audio files are permanently deleted within 24 hours of
                    analysis completion. We do not retain audio data beyond this period under any
                    circumstances.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Analysis Results</h3>
                  <p>
                    Detection results (classification, confidence score, language) may be retained
                    for a maximum of 30 days to improve our service and for dispute resolution. Users
                    can request deletion at any time.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Server Logs</h3>
                  <p>
                    Server logs are retained for 90 days for security and abuse prevention, then
                    permanently deleted.
                  </p>
                </div>
              </div>
            </Card>

            {/* Data Security */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement comprehensive security measures to protect your data:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>End-to-end encryption for audio transmission (TLS 1.3)</li>
                <li>Secure data centers with 24/7 monitoring</li>
                <li>Regular security audits and penetration testing</li>
                <li>Compliance with industry security standards</li>
                <li>Encrypted storage for temporary audio files</li>
              </ul>
            </Card>

            {/* Third-Party Sharing */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Third-Party Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. Audio
                content is never shared with external parties for any reason. We may share
                non-identifying, aggregated analytics data with service partners only as necessary for
                platform operation.
              </p>
            </Card>

            {/* User Rights */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Access what data we hold about you</li>
                  <li>Request deletion of your analysis history</li>
                  <li>Opt-out of analytics collection</li>
                  <li>Export your data in a standard format</li>
                  <li>File a complaint with regulatory authorities</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at{' '}
                  <span className="font-mono text-primary">privacy@voicedetect.app</span>
                </p>
              </div>
            </Card>

            {/* Cookies */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Cookies</h2>
              <p className="text-muted-foreground">
                We use minimal cookies, primarily for session management and dark mode preference. You
                can disable cookies in your browser settings. Disabling cookies may affect platform
                functionality.
              </p>
            </Card>

            {/* Contact */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, please
                  contact us:
                </p>
                <p>
                  Email:{' '}
                  <a href="mailto:privacy@voicedetect.app" className="text-primary hover:underline">
                    privacy@voicedetect.app
                  </a>
                </p>
                <p>
                  Support:{' '}
                  <a href="https://voicedetect.app/support" className="text-primary hover:underline">
                    voicedetect.app/support
                  </a>
                </p>
              </div>
            </Card>

            {/* Changes */}
            <Card className="p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Policy Changes</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy occasionally. We will notify you of any material
                changes by updating the "Last updated" date at the top of this page. Your continued
                use of the platform constitutes your acceptance of the updated policy.
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
