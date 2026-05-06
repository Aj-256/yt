import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 })
  }

  try {
    const { data } = await axios.get(`https://aj-ibra.zone.id/api/tiktok?url=${encodeURIComponent(url)}`)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch TikTok data' }, { status: 500 })
  }
}