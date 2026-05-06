'use client'

import { CheckCircle, XCircle, X } from 'lucide-react'
import { useState } from 'react'

export default function Toast({ message, type = 'success' }) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
      <div className={`
        glass-card p-4 flex items-center gap-3 min-w-[300px]
        ${type === 'success' ? 'border-green-500/30' : 'border-red-500/30'}
      `}>
        {type === 'success' ? (
          <CheckCircle className="w-6 h-6 text-green-400" />
        ) : (
          <XCircle className="w-6 h-6 text-red-400" />
        )}
        <p className="text-sm flex-1">{message}</p>
        <button 
          onClick={() => setVisible(false)}
          className="p-1 hover:bg-white/10 rounded transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}