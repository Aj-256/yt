'use client'

import { Play } from 'lucide-react'

export default function PreviewPlayer({ videoUrl, thumbnail, title }) {
  if (!videoUrl) return null

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null
  }

  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  return (
    <div className="glass-card p-4 animate-fade-in">
      <h3 className="text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
        <Play className="w-4 h-4 text-purple-400" />
        Video Preview
      </h3>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black/50">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : thumbnail ? (
          <div className="relative w-full h-full">
            <img
              src={thumbnail}
              alt={title || 'Video preview'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Play className="w-16 h-16 text-white opacity-70" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Preview not available
          </div>
        )}
      </div>
      {title && (
        <p className="mt-3 text-sm text-gray-400 line-clamp-2">{title}</p>
      )}
    </div>
  )
}