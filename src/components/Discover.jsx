import { useEffect, useState } from 'react'
import { Globe, Link2, Tag, Star } from 'lucide-react'

export default function Discover({ query }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/discover?q=${encodeURIComponent(query || 'pet')}&limit=12`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setItems(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [query])

  if (loading) return <p className="text-blue-200 px-6">Loading suggestions…</p>
  if (error) return <p className="text-red-300 px-6">{error}</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-16 max-w-7xl mx-auto">
      {items.map((p, i) => (
        <div key={i} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 hover:border-blue-400/40 transition">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <a href={p.url} target="_blank" rel="noreferrer" className="text-white font-semibold hover:underline line-clamp-2">
                {p.title || p.url}
              </a>
              <div className="mt-2 flex items-center gap-3 text-blue-300/80 text-sm">
                <span className="inline-flex items-center gap-1"><Globe size={14}/> {p.source}</span>
                {p.price != null && (
                  <span className="inline-flex items-center gap-1"><Tag size={14}/> {p.currency || ''} {p.price}</span>
                )}
              </div>
            </div>
            {p.images?.[0] && (
              <img src={p.images[0]} alt="thumb" className="w-16 h-16 rounded object-cover border border-blue-500/20" />
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-blue-300/80 text-xs flex items-center gap-2">
              {p.niche_tags?.slice(0,3)?.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{t}</span>
              ))}
            </div>
            {p.score && (
              <div className="inline-flex items-center gap-1 text-yellow-300">
                <Star size={14} /> <span className="text-sm font-medium">{p.score}</span>
              </div>
            )}
          </div>
          <a href={p.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-blue-200 hover:text-white">
            <Link2 size={16}/> Visit product
          </a>
        </div>
      ))}
    </div>
  )
}
