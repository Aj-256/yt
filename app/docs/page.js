'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { ChevronDown, Play, Search, Download, Music, Smartphone } from 'lucide-react'

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      q: 'How do I download TikTok videos?',
      a: 'Go to Home page, select TikTok tab, paste the video URL, and click Download MP4 or MP3.'
    },
    {
      q: 'How do I search YouTube videos?',
      a: 'Select YouTube tab, type your search query in the search bar, browse results, and select a video to download.'
    },
    {
      q: 'What video qualities are available?',
      a: 'YouTube supports 144p, 240p, 360p, 480p, 720p, and 1080p. TikTok downloads in original quality.'
    },
    {
      q: 'Can I download audio only?',
      a: 'Yes! Click the "Download MP3" button on any video to extract and download the audio.'
    },
    {
      q: 'Is Gumite Downloader free?',
      a: 'Yes! Gumite Downloader v1 is completely free to use.'
    },
    {
      q: 'Which platforms are supported?',
      a: 'Currently TikTok and YouTube. Instagram, Facebook, and Twitter coming in v2.'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className="flex-1 flex relative">
        <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-gray-400 text-lg mb-12">
              Everything you need to know about Gumite Downloader v1
            </p>

            {/* Getting Started */}
            <section className="glass-card p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Play className="text-purple-400" />
                Getting Started
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Choose Platform</h3>
                    <p className="text-gray-400">Select TikTok or YouTube tab at the top of the downloader.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Paste URL or Search</h3>
                    <p className="text-gray-400">For TikTok, paste the video URL. For YouTube, search by keyword or paste URL.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Preview Video</h3>
                    <p className="text-gray-400">Watch the video preview to confirm it's the right content.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Download</h3>
                    <p className="text-gray-400">Choose MP4 for video or MP3 for audio only. Select quality for YouTube.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="glass-card p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-xl text-center">
                  <Search className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">YouTube Search</h3>
                  <p className="text-gray-400 text-sm">Search and find any YouTube video directly from the site.</p>
                </div>
                <div className="glass p-6 rounded-xl text-center">
                  <Download className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Video Downloads</h3>
                  <p className="text-gray-400 text-sm">Download videos in multiple qualities up to 1080p.</p>
                </div>
                <div className="glass p-6 rounded-xl text-center">
                  <Music className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">MP3 Converter</h3>
                  <p className="text-gray-400 text-sm">Extract audio and download as MP3 files.</p>
                </div>
              </div>
            </section>

            {/* Supported Platforms */}
            <section className="glass-card p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Smartphone className="text-purple-400" />
                Supported Platforms
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2">✅ TikTok</h3>
                  <p className="text-gray-400 text-sm">Video and audio downloads</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2">✅ YouTube</h3>
                  <p className="text-gray-400 text-sm">Search, video, and audio downloads</p>
                </div>
                <div className="glass p-4 rounded-xl opacity-50">
                  <h3 className="font-semibold text-lg mb-2">🔜 Instagram</h3>
                  <p className="text-gray-400 text-sm">Coming in v2</p>
                </div>
                <div className="glass p-4 rounded-xl opacity-50">
                  <h3 className="font-semibold text-lg mb-2">🔜 Facebook</h3>
                  <p className="text-gray-400 text-sm">Coming in v2</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="glass-card p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="glass rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-all"
                    >
                      <span className="font-semibold">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="p-4 pt-0 text-gray-400 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </main>
    </div>
  )
}