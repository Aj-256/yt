'use client'

export default function QualitySelector({ selected, onSelect }) {
  const qualities = ['144', '240', '360', '480', '720', '1080']

  return (
    <div className="glass-card p-4 animate-fade-in">
      <label className="text-sm font-semibold text-gray-300 mb-3 block">
        Select Quality
      </label>
      <div className="flex flex-wrap gap-2">
        {qualities.map((quality) => (
          <button
            key={quality}
            onClick={() => onSelect(quality)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${selected === quality 
                ? 'gradient-btn neon-glow' 
                : 'glass hover:bg-white/10 text-gray-400'
              }
            `}
          >
            {quality}p
          </button>
        ))}
      </div>
    </div>
  )
}