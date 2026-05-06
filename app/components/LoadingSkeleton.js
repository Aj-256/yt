export function CardSkeleton() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="w-24 h-16 skeleton rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 skeleton rounded w-3/4" />
          <div className="h-3 skeleton rounded w-1/2" />
          <div className="h-3 skeleton rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function PreviewSkeleton() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="aspect-video skeleton rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-5 skeleton rounded w-2/3" />
        <div className="h-4 skeleton rounded w-1/2" />
      </div>
    </div>
  )
}