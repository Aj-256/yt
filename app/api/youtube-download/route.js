import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
  try {
    const { url, format = '720', type = 'mp4' } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const BASE = 'https://ytdownloader.io'
    const UA = 'Mozilla/5.0 (Linux; Android 14; Infinix X6833B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36'

    // Step 1: Fetch nonce
    const pageRes = await axios.get(BASE + '/', {
      headers: { 'user-agent': UA, 'accept': 'text/html' }
    })
    const html = pageRes.data
    const nonceMatch = html.match(/"nonce":"([a-f0-9]+)"/)
    if (!nonceMatch) {
      return NextResponse.json({ error: 'Failed to initialize download' }, { status: 500 })
    }
    const nonce = nonceMatch[1]

    const cookie = pageRes.headers['set-cookie']?.[0]?.split(';')[0] || ''
    const headers = {
      'content-type': 'application/json',
      'x-visolix-nonce': nonce,
      'referer': BASE + '/',
      'user-agent': UA,
      'cookie': cookie
    }

    // Step 2: Submit download
    const dlRes = await axios.post(BASE + '/wp-json/visolix/api/download', {
      url,
      format,
      captcha_response: null
    }, { headers })

    const dlData = dlRes.data
    const taskMatch = dlData.data?.match(/download-btn-([^"\\]+)/)
    if (!taskMatch) {
      return NextResponse.json({ error: 'Failed to start download' }, { status: 500 })
    }
    const taskId = taskMatch[1]

    // Step 3: Poll progress
    let dlUrl = ''
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 3000))
      const progRes = await axios.post(BASE + '/wp-json/visolix/api/progress', {
        id: taskId,
        host: 'youtube'
      }, { headers })
      
      if (progRes.data.success === 1 && progRes.data.download_url) {
        dlUrl = progRes.data.download_url
        break
      }
    }

    if (!dlUrl) {
      return NextResponse.json({ error: 'Download timeout' }, { status: 500 })
    }

    // Step 4: Get secure URL
    const secureRes = await axios.post(BASE + '/wp-json/visolix/api/youtube-secure-url', {
      url: dlUrl,
      host: 'youtube',
      video_id: taskId
    }, { headers })

    const downloadUrl = secureRes.data.secure_url || dlUrl

    return NextResponse.json({
      success: true,
      downloadUrl,
      format,
      type,
      taskId
    })
  } catch (error) {
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}