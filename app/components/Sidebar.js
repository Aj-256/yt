'use client'

import { X, Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const developers = [
  {
    name: 'Aj',
    github: 'https://github.com/Aj-256',
    role: 'Front End',
    icon: 'https://vero-upload.zone.id/files/1767101841497_drj4iscx09i.jpg',
  },
  {
    name: 'Riddi-t',
    github: 'https://github.com/Riddi-t',
    role: 'Back End',
    icon: 'https://vero-upload.zone.id/files/1777801753260_hdk8su5qu15.jpg',
  },
  {
    name: 'Uthuman',
    github: 'https://github.com/what-sapp',
    role: "API's",
    icon: 'https://vero-upload.zone.id/files/1767101870259_e83xwscyhgb.png',
  },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 z-50
        glass border-l border-white/10
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold gradient-text">Developers</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {developers.map((dev, index) => (
              <div 
                key={index}
                className="glass-card p-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400 neon-glow">
                    <Image
                      src={dev.icon}
                      alt={dev.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{dev.name}</h3>
                    <p className="text-sm text-purple-400 mb-2">{dev.role}</p>
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-all"
                    >
                      <Github className="w-3 h-3" />
                      GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 glass rounded-xl text-center">
            <p className="text-sm text-gray-400">
              Gumite Downloader v1
            </p>
            <p className="text-xs text-gray-500 mt-1">
              More platforms coming in v2
            </p>
          </div>
        </div>
      </div>
    </>
  )
}