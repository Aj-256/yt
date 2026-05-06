import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  try {
    // Use Invidious API (free, no key needed)
    const response = await fetch(
      `https://inv.nadeko.net/api/v1/search?q=${encodeURIComponent(query)}&type=video&sort=relevance`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Search failed')
    }

    const videos = await response.json()
    
    const results = videos.slice(0, 20).map(video => ({
      title: video.title || 'No title',
      videoId: video.videoId || '',
      url: `https://www.youtube.com/watch?v=${video.videoId}`,
      thumbnail: video.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
      duration: formatDuration(video.lengthSeconds),
      views: formatNumber(video.viewCount),
      author: video.author || 'Unknown',
      ago: video.publishedText || ''
    }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    
    // Fallback: Try another API
    try {
      const fallbackResponse = await fetch(
        `https://vid.puffyan.us/api/v1/search?q=${encodeURIComponent(query)}&type=video`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      )
      
      if (fallbackResponse.ok) {
        const videos = await fallbackResponse.json()
        const results = videos.slice(0, 20).map(video => ({
          title: video.title || 'No title',
          videoId: video.videoId || '',
          url: `https://www.youtube.com/watch?v=${video.videoId}`,
          thumbnail: video.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
          duration: formatDuration(video.lengthSeconds),
          views: formatNumber(video.viewCount),
          author: video.author || 'Unknown',
          ago: video.publishedText || ''
        }))
        
        return NextResponse.json({ results })
      }
    } catch (fallbackError) {
      console.error('Fallback search error:', fallbackError)
    }
    
    return NextResponse.json({ results: [], error: 'Search failed' }, { status: 500 })
  }
}

function formatDuration(seconds) {
  if (!seconds) return 'N/A'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatNumber(num) {
  if (!num) return 'N/A'
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}