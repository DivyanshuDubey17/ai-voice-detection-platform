'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const CODE_EXAMPLES = {
  curl: `curl -X POST https://voicedetect.app/api/voice-detect \\
  -H "Content-Type: application/json" \\
  -d '{
    "audio_base64": "SUQzBAAAI1MTT1BODQAwMDAwMDAwMjM3TkFNRQAAAAA=",
    "language": "en"
  }'`,

  python: `import requests
import base64

with open("audio.mp3", "rb") as f:
    audio_base64 = base64.b64encode(f.read()).decode()

response = requests.post(
    "https://voicedetect.app/api/voice-detect",
    json={
        "audio_base64": audio_base64,
        "language": "en"
    }
)

print(response.json())`,

  javascript: `const response = await fetch('/api/voice-detect', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    audio_base64: 'base64EncodedAudio',
    language: 'en'
  })
});

const result = await response.json();
console.log(result);`,

  nodejs: `const axios = require('axios');
const fs = require('fs');

const audioBuffer = fs.readFileSync('audio.mp3');
const audioBase64 = audioBuffer.toString('base64');

try {
  const response = await axios.post(
    'https://voicedetect.app/api/voice-detect',
    {
      audio_base64: audioBase64,
      language: 'en'
    }
  );
  console.log(response.data);
} catch (error) {
  console.error('Error:', error.response.data);
}`,
}

export default function APIDocs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(label)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">API Documentation</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Integrate AI voice detection into your application
          </p>
        </div>

        {/* Quick Start */}
        <Card className="p-8 mb-12 border border-border/50">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Endpoint</h3>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                POST /api/voice-detect
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Base URL</h3>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                https://voicedetect.app
              </div>
            </div>
          </div>
        </Card>

        {/* Request/Response */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Request */}
          <Card className="p-8 border border-border/50">
            <h2 className="text-xl font-bold mb-6">Request</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Headers</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                  <div>Content-Type: application/json</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Body Parameters</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm">audio_base64</span>
                      <Badge className="text-xs rounded-full">required</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Base64-encoded audio file (MP3, WAV, OGG)
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm">language</span>
                      <Badge className="text-xs rounded-full">required</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Language code: auto, en, hi, ta, ml, te
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Response */}
          <Card className="p-8 border border-border/50">
            <h2 className="text-xl font-bold mb-6">Response</h2>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
              <div>
                <span className="text-primary">"classification"</span>:
                <span className="text-green-600 dark:text-green-400">
                  {' "AI_GENERATED" | "HUMAN"'}
                </span>
              </div>
              <div>
                <span className="text-primary">"confidence"</span>:
                <span className="text-orange-600 dark:text-orange-400"> number</span> (0-100)
              </div>
              <div>
                <span className="text-primary">"language"</span>:
                <span className="text-blue-600 dark:text-blue-400"> string</span>
              </div>
              <div>
                <span className="text-primary">"explanation"</span>:
                <span className="text-blue-600 dark:text-blue-400"> string</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Code Examples */}
        <Card className="p-8 border border-border/50 mb-12">
          <h2 className="text-2xl font-bold mb-6">Code Examples</h2>

          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-lg bg-muted">
              <TabsTrigger value="javascript" className="rounded-md">
                JavaScript
              </TabsTrigger>
              <TabsTrigger value="python" className="rounded-md">
                Python
              </TabsTrigger>
              <TabsTrigger value="nodejs" className="rounded-md">
                Node.js
              </TabsTrigger>
              <TabsTrigger value="curl" className="rounded-md">
                cURL
              </TabsTrigger>
            </TabsList>

            {Object.entries(CODE_EXAMPLES).map(([key, code]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto font-mono text-sm text-foreground">
                    {code}
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(code, key)}
                  >
                    {copiedCode === key ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        {/* Languages */}
        <Card className="p-8 border border-border/50 mb-12">
          <h2 className="text-2xl font-bold mb-6">Supported Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { code: 'auto', name: 'Auto-detect' },
              { code: 'en', name: 'English' },
              { code: 'hi', name: 'Hindi' },
              { code: 'ta', name: 'Tamil' },
              { code: 'ml', name: 'Malayalam' },
              { code: 'te', name: 'Telugu' },
            ].map((lang) => (
              <div
                key={lang.code}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border/50"
              >
                <Badge variant="outline" className="font-mono">
                  {lang.code}
                </Badge>
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Error Handling */}
        <Card className="p-8 border border-border/50">
          <h2 className="text-2xl font-bold mb-6">Error Handling</h2>
          <div className="space-y-4">
            {[
              { status: 400, message: 'Bad Request - Invalid parameters' },
              { status: 401, message: 'Unauthorized - Invalid API key' },
              { status: 429, message: 'Too Many Requests - Rate limit exceeded' },
              { status: 500, message: 'Internal Server Error' },
            ].map((error) => (
              <div
                key={error.status}
                className="p-4 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary">{error.status}</span>
                  <span>{error.message}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      </main>
      <Footer />
    </div>
  )
}
