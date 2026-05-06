'use client'

import { useState } from 'react'
import YouTubeSearch from './YouTubeSearch'
import TikTokDownload from './TikTokDownload'

export default function DownloadForm({ showToast }) {
  const [activeTab, setActiveTab] = useState('tiktok')

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab('tiktok')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            activeTab === 'tiktok'
              ? 'gradient-btn neon-glow'
              : 'glass text-gray-400 hover:text-white'
          }`}
        >
          📱 TikTok
        </button>
        <button
          onClick={() => setActiveTab('youtube')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            activeTab === 'youtube'
              ? 'gradient-btn neon-glow'
              : 'glass text-gray-400 hover:text-white'
          }`}
        >
          ▶️ YouTube
        </button>
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === 'tiktok' ? (
          <TikTokDownload showToast={showToast} />
        ) : (
          <YouTubeSearch showToast={showToast} />
        )}
      </div>
    </div>
  )
}