'use client'

import { useState, useCallback } from 'react'
import { Search, Video, Music, Loader } from 'lucide-react'
import SearchResults from './SearchResults'
import PreviewPlayer from './PreviewPlayer'
import QualitySelector from './QualitySelector'
import axios from 'axios'

export default function YouTubeSearch({ showToast }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [quality, setQuality] = useState('720')
  const [downloading, setDownloading] = useState(false)
  const [downloadType, setDownloadType] = useState(null)

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return
    setLoading(true)
    setSelectedVideo(null)
    
    try {
      const { data } = await axios.get(`/api/youtube-search?q=${encodeURIComponent(query)}`)
      setResults(data.results || [])
      if (data.results?.length === 0) {
        showToast('No videos found. Try different keywords.', 'info')
      }
    } catch (error) {
      showToast('Search failed. Please try again.', 'error')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [query, showToast])

  const handleSelectVideo = (video) => {
    setSelectedVideo(video)
  }

  const handleDownload = async (type) => {
    if (!selectedVideo) return
    
    setDownloading(true)
    setDownloadType(type)
    
    try {
      const { data } = await axios.post('/api/youtube-download', {
        url: selectedVideo.url,
        format: quality,
        type: type
      })
      
      if (data.downloadUrl) {
        // Open download in new tab
        const link = document.createElement('a')
        link.href = data.downloadUrl
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        const message = type === 'mp3' 
          ? '🎵 Audio download started! Converting to MP3...' 
          : '📹 Video download started!'
        showToast(message)
      } else {
        showToast('Download failed. Please try again.', 'error')
      }
    } catch (error) {
      showToast('Download failed. Please try again.', 'error')
    } finally {
      setDownloading(false)
      setDownloadType(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search YouTube videos or songs..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:neon-glow transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="gradient-btn px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Results or Selected Video */}
      {!selectedVideo ? (
        <SearchResults 
          results={results} 
          onSelect={handleSelectVideo}
          loading={loading}
        />
      ) : (
        <div className="space-y-6 animate-fade-in">
          <button
            onClick={() => setSelectedVideo(null)}
            className="text-sm text-purple-400 hover:text-purple-300 transition-all flex items-center gap-1"
          >
            ← Back to search results
          </button>
          
          <PreviewPlayer 
            videoUrl={selectedVideo.url}
            thumbnail={selectedVideo.thumbnail}
            title={selectedVideo.title}
          />

          <div className="glass-card p-4">
            <h3 className="font-semibold text-lg mb-2">{selectedVideo.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {selectedVideo.author && <span>📺 {selectedVideo.author}</span>}
              {selectedVideo.duration && <span>⏱️ {selectedVideo.duration}</span>}
              {selectedVideo.views && <span>👁️ {selectedVideo.views}</span>}
              {selectedVideo.ago && <span>📅 {selectedVideo.ago}</span>}
            </div>
          </div>

          <QualitySelector selected={quality} onSelect={setQuality} />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleDownload('mp4')}
              disabled={downloading}
              className="gradient-btn flex-1 py-4 flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
            >
              {downloading && downloadType === 'mp4' ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Video className="w-5 h-5" />
              )}
              {downloading && downloadType === 'mp4' ? 'Downloading Video...' : '📹 Download MP4 Video'}
            </button>
            <button
              onClick={() => handleDownload('mp3')}
              disabled={downloading}
              className="glass-card px-6 py-4 flex-1 flex items-center justify-center gap-2 hover:bg-white/10 transition-all font-semibold disabled:opacity-50"
            >
              {downloading && downloadType === 'mp3' ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Music className="w-5 h-5" />
              )}
              {downloading && downloadType === 'mp3' ? 'Converting to MP3...' : '🎵 Download MP3 Audio'}
            </button>
          </div>

          {downloadType === 'mp3' && downloading && (
            <div className="glass-card p-4 text-center animate-pulse">
              <p className="text-sm text-purple-400">
                Converting video to MP3 audio... This may take up to 60 seconds.
              </p>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{width: '60%'}} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}