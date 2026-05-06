'use client'

import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import DownloadForm from './components/DownloadForm'
import Toast from './components/Toast'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className="flex-1 flex relative">
        <div className="flex-1 p-4 md:p-8">
          <DownloadForm showToast={showToast} />
        </div>
        
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      </main>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}