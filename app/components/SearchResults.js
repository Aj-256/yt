'use client'

import { Play, Clock, Eye, User } from 'lucide-react'
import Image from 'next/image'

export default function SearchResults({ results, onSelect, loading }) {
  if (loading) {
    return (
      <div className="space-y-3 mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="glass-card p-4 animate-pulse">
            <div className="flex gap-4">
              <div className="w-32 h-20 skeleton rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 skeleton rounded w-3/4" />
                <div className="h-3 skeleton rounded w-1/2" />
                <div className="h-3 skeleton rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12 mt-4">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-400 text-lg">No videos found</p>
        <p className="text-gray-500 text-sm mt-2">Try different keywords or check your spelling</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 mt-4 max-h-[500px] overflow-y-auto">
      <p className="text-sm text-gray-400 mb-2">
        Found {results.length} results
      </p>
      {results.map((video, index) => (
        <div
          key={video.videoId || index}
          onClick={() => onSelect(video)}
          className="glass-card p-4 cursor-pointer group animate-fade-in hover:border-purple-400/50 transition-all"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex gap-4">
            <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white" />
              </div>
              {video.duration && (
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-purple-400 transition-all">
                {video.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                {video.author && (
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {video.author}
                  </span>
                )}
                {video.views && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views}
                  </span>
                )}
                {video.ago && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.ago}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}