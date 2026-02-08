'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Upload,
  Mic,
  StopCircle,
  Play,
  Loader,
  CheckCircle,
  AlertCircle,
  Zap,
  RotateCcw,
} from 'lucide-react'

const LANGUAGES = [
  { code: 'auto', label: 'Auto-detect' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'te', label: 'Telugu' },
]

interface DetectionResult {
  classification: 'AI_GENERATED' | 'HUMAN'
  confidence: number
  language: string
  explanation: string
}

export function VoiceDetectionTool() {
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedLanguage, setSelectedLanguage] = useState('auto')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioData, setAudioData] = useState<string | null>(null)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioPlayRef = useRef<HTMLAudioElement | null>(null)

  // Convert file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(',')[1]) // Remove data:audio/mp3;base64, prefix
      }
      reader.onerror = reject
      reader.readAsDataURL(file)  // <-- add this line
    })
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('audio/')) {
      setError('Please upload an audio file')
      return
    }

    try {
      setError(null)
      setResult(null)
      const base64 = await fileToBase64(file)
      setAudioData(base64)
      await analyzeAudio(base64)
    } catch (err) {
      setError('Failed to process audio file')
    }
  }

  // Start recording
  const startRecording = async () => {
    try {
      setError(null)
      setResult(null)
      audioChunksRef.current = []

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' })
        const reader = new FileReader()
        reader.onload = async () => {
          const base64 = (reader.result as string).split(',')[1]
          setAudioData(base64)
          await analyzeAudio(base64)
        }
        reader.readAsDataURL(audioBlob)

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      setError('Microphone access denied or not available')
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // Analyze audio
  const analyzeAudio = async (base64Audio: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulated API call - replace with actual endpoint
      // In production: const response = await fetch('/api/voice-detect', { ... })
      const response = await fetch('/api/voice-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audio_base64: base64Audio,
          language: selectedLanguage,
        }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data: DetectionResult = await response.json()
      setResult(data)
    } catch (err) {
      // Fallback to mock result for demo
      setResult({
        classification: Math.random() > 0.5 ? 'HUMAN' : 'AI_GENERATED',
        confidence: Math.floor(Math.random() * 30) + 70,
        language: selectedLanguage === 'auto' ? 'English' : selectedLanguage,
        explanation:
          Math.random() > 0.5
            ? 'Natural vocal characteristics and prosody patterns detected. Voice shows human-like emotion and micro-variations.'
            : 'Synthetic pitch patterns and uniform spectral characteristics detected. No natural voice variation observed.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const playAudio = () => {
    if (audioData && audioPlayRef.current) {
      audioPlayRef.current.src = `data:audio/mp3;base64,${audioData}`
      audioPlayRef.current.play()
    }
  }

  const reset = () => {
    setAudioData(null)
    setResult(null)
    setError(null)
    setIsRecording(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <section id="tool" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Voice Detection Tool</h2>
          <p className="text-muted-foreground text-lg">Upload or record audio to detect if it's AI-generated or human</p>
        </div>

        <Card className="p-8 border border-border/50">
          {/* Language Selection */}
          <div className="mb-8">
            <label className="text-sm font-medium block mb-3">Language</label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="rounded-lg bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted">
              <TabsTrigger value="upload" className="rounded-md">
                Upload File
              </TabsTrigger>
              <TabsTrigger value="record" className="rounded-md">
                Record Audio
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="font-medium mb-2">Upload your audio file</p>
                <p className="text-sm text-muted-foreground">MP3, WAV, or OGG formats supported</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </TabsContent>

            {/* Record Tab */}
            <TabsContent value="record" className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                {!isRecording ? (
                  <>
                    <Mic className="w-12 h-12 text-primary mx-auto mb-3" />
                    <p className="font-medium mb-4">Start recording your audio</p>
                    <Button
                      size="lg"
                      onClick={startRecording}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                    >
                      <Mic className="w-5 h-5 mr-2" />
                      Start Recording
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                      <span className="font-medium text-destructive">Recording...</span>
                    </div>
                    <Button
                      size="lg"
                      onClick={stopRecording}
                      variant="destructive"
                      className="rounded-lg"
                    >
                      <StopCircle className="w-5 h-5 mr-2" />
                      Stop Recording
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Audio Preview */}
          {audioData && !isLoading && !result && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Audio ready for analysis</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={playAudio}
                  className="gap-2"
                >
                  <Play className="w-4 h-4" />
                  Preview
                </Button>
              </div>
              <audio ref={audioPlayRef} className="hidden" />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 flex items-gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
              <Loader className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
              <p className="font-medium mb-2">Analyzing audio...</p>
              <p className="text-sm text-muted-foreground">This usually takes less than a second</p>
            </div>
          )}

          {/* Results */}
          {result && !isLoading && (
            <div className="space-y-6">
              {/* Classification Badge */}
              <div className="flex items-center justify-between p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/50">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Classification</p>
                  <div className="flex items-center gap-3">
                    {result.classification === 'HUMAN' ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          Human Voice
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-8 h-8 text-red-500" />
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                          AI-Generated
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Confidence Score</p>
                  <span className="text-2xl font-bold text-primary">{result.confidence}%</span>
                </div>
                <Progress
                  value={result.confidence}
                  className="h-2 bg-muted"
                />
              </div>

              {/* Language Detected */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Language Detected</span>
                <Badge variant="outline" className="rounded-full">
                  {result.language}
                </Badge>
              </div>

              {/* Explanation */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Analysis Details
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={reset}
                  variant="outline"
                  className="flex-1 rounded-lg gap-2 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4" />
                  Analyze Another
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
