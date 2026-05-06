'use client'

import { useState } from 'react'
import { Download, Music, Video } from 'lucide-react'
import PreviewPlayer from './PreviewPlayer'
import axios from 'axios'

export default function TikTokDownload({ showToast }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoData, setVideoData] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [downloadType, setDownloadType] = useState(null)

  const handleFetch = async () => {
    if (!url.trim()) return
    setLoading(true)
    setVideoData(null)
    
    try {
      const { data } = await axios.get(`/api/tiktok?url=${encodeURIComponent(url)}`)
      if (data.success) {
        setVideoData(data.result)
        showToast('Video found!')
      } else {
        showToast('Failed to fetch video. Check the URL.', 'error')
      }
    } catch (error) {
      showToast('Failed to fetch video. Check the URL.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (type) => {
    if (!videoData) return
    
    setDownloading(true)
    setDownloadType(type)
    
    try {
      const downloadUrl = type === 'mp3' ? videoData.musicUrl : videoData.videoUrl
      if (downloadUrl) {
        window.open(downloadUrl, '_blank')
        showToast(`${type === 'mp3' ? 'Audio' : 'Video'} download started!`)
      } else {
        showToast('Download URL not available', 'error')
      }
    } catch (error) {
      showToast('Download failed', 'error')
    } finally {
      setDownloading(false)
      setDownloadType(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
          placeholder="Paste TikTok video URL..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:neon-glow transition-all"
        />
        <button
          onClick={handleFetch}
          disabled={loading || !url.trim()}
          className="gradient-btn px-6 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Fetch
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="glass-card p-4 animate-pulse">
          <div className="aspect-video skeleton rounded-lg mb-4" />
          <div className="h-4 skeleton rounded w-3/4 mb-2" />
          <div className="h-3 skeleton rounded w-1/2" />
        </div>
      )}

      {/* Video Data */}
      {videoData && (
        <div className="space-y-6 animate-fade-in">
          <PreviewPlayer 
            videoUrl={videoData.videoUrl}
            thumbnail={videoData.cover}
            title={videoData.title}
          />

          <div className="glass-card p-4">
            <h3 className="font-semibold text-lg mb-2">{videoData.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {videoData.author && (
                <span>👤 {videoData.author.name} (@{videoData.author.username})</span>
              )}
              {videoData.create_at && <span>📅 {videoData.create_at}</span>}
              {videoData.stats?.play && <span>▶️ {videoData.stats.play}</span>}
              {videoData.stats?.like && <span>❤️ {videoData.stats.like}</span>}
            </div>
            {videoData.music_info && (
              <p className="text-sm text-gray-500 mt-2">
                🎵 {videoData.music_info.title} - {videoData.music_info.author}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleDownload('mp4')}
              disabled={downloading}
              className="gradient-btn flex-1 flex items-center justify-center gap-2 min-w-[150px]"
            >
              <Video className="w-4 h-4" />
              {downloading && downloadType === 'mp4' ? '⏳ Downloading...' : 'Download MP4'}
            </button>
            <button
              onClick={() => handleDownload('mp3')}
              disabled={downloading}
              className="glass-card px-6 py-3 flex-1 flex items-center justify-center gap-2 min-w-[150px] hover:bg-white/10 transition-all font-semibold"
            >
              <Music className="w-4 h-4" />
              {downloading && downloadType === 'mp3' ? '⏳ Converting...' : 'Download MP3'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}