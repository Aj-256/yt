import './globals.css'

export const metadata = {
  title: 'Gumite Downloader v1',
  description: 'Download videos from TikTok and YouTube',
  keywords: 'download, tiktok, youtube, video, audio, mp3, mp4',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}