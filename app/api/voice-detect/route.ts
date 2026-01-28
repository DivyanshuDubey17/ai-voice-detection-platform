import { NextRequest, NextResponse } from 'next/server'

interface VoiceDetectRequest {
  audio_base64: string
  language: string
}

interface VoiceDetectResponse {
  classification: 'AI_GENERATED' | 'HUMAN'
  confidence: number
  language: string
  explanation: string
}

// Simulated analysis function
// In production, this would call your ML model service
async function analyzeVoice(
  audioBase64: string,
  language: string
): Promise<VoiceDetectResponse> {
  // Simulate processing delay (realistic API call)
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400))

  // Mock analysis logic based on audio characteristics
  const audioChars = audioBase64.substring(0, 200)
  const hash = audioChars.split('').reduce((acc, char) => {
    return ((acc << 5) - acc + char.charCodeAt(0)) | 0
  }, 0)

  // More sophisticated mock detection
  const variance = Math.abs(hash) % 100
  const isAI = variance < 45 // 45% chance of AI
  const confidence = 65 + Math.abs(hash % 35)
  const languageLabel = getLanguageLabel(language === 'auto' ? detectLanguage(hash) : language)

  const aiExplanations = [
    'Synthetic pitch patterns and uniform spectral characteristics detected. Mel-frequency analysis shows consistent formant spacing typical of AI synthesis.',
    'Abnormal prosody detected. Voice exhibits unnatural stress patterns and breathing inconsistencies. CNN-based model confidence: 92%',
    'Mel-spectrogram analysis reveals periodic artifacts consistent with neural vocoder output. Transformer model flags potential AI generation.',
  ]

  const humanExplanations = [
    'Natural vocal characteristics and prosody patterns detected. Voice shows human-like emotion and natural micro-variations in pitch and timbre.',
    'Authentic human speech identified. Detected natural breathing patterns and spontaneous vocal characteristics. Confidence: Human verified.',
    'Human voice confirmed. Analysis shows natural formant transitions and authentic emotional expression patterns typical of human speech.',
  ]

  const explanations = isAI ? aiExplanations : humanExplanations
  const selectedExplanation = explanations[Math.abs(hash) % explanations.length]

  return {
    classification: isAI ? 'AI_GENERATED' : 'HUMAN',
    confidence,
    language: languageLabel,
    explanation: selectedExplanation,
  }
}

function detectLanguage(seed: number): string {
  const languages = ['en', 'hi', 'ta', 'ml', 'te']
  return languages[Math.abs(seed) % languages.length]
}

function getLanguageLabel(code: string): string {
  const languages: Record<string, string> = {
    auto: 'Auto-detected',
    en: 'English',
    hi: 'Hindi',
    ta: 'Tamil',
    ml: 'Malayalam',
    te: 'Telugu',
  }
  return languages[code] || 'Unknown'
}

export async function POST(request: NextRequest) {
  try {
    // Validate request
    if (request.headers.get('content-type') !== 'application/json') {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }

    const body = (await request.json()) as VoiceDetectRequest

    // Validate input
    if (!body.audio_base64) {
      return NextResponse.json(
        { error: 'audio_base64 is required' },
        { status: 400 }
      )
    }

    if (!body.language) {
      return NextResponse.json(
        { error: 'language is required' },
        { status: 400 }
      )
    }

    // Validate language code
    const validLanguages = ['auto', 'en', 'hi', 'ta', 'ml', 'te']
    if (!validLanguages.includes(body.language)) {
      return NextResponse.json(
        {
          error: `Invalid language. Must be one of: ${validLanguages.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Validate audio data (basic check for Base64)
    if (body.audio_base64.length < 100) {
      return NextResponse.json(
        { error: 'Audio data appears invalid or too small' },
        { status: 400 }
      )
    }

    // Analyze voice
    const result = await analyzeVoice(body.audio_base64, body.language)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Voice detection error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to provide API information
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/voice-detect',
    method: 'POST',
    description: 'Detect if voice is AI-generated or human',
    request: {
      audio_base64: 'Base64-encoded MP3 audio',
      language: 'Language code: auto, en, hi, ta, ml, te',
    },
    response: {
      classification: 'AI_GENERATED or HUMAN',
      confidence: 'Confidence score 0-100',
      language: 'Detected language',
      explanation: 'Detailed analysis explanation',
    },
  })
}
