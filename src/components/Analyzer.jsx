import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

export default function Analyzer({ onResult }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyze = async (e) => {
    e.preventDefault()
    setError('')
    if (!url) return
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) throw new Error('Failed to analyze URL')
      const data = await res.json()
      onResult?.(data)
      setUrl('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6">
      <form onSubmit={analyze} className="flex items-center gap-3 bg-slate-800/60 border border-blue-500/20 rounded-xl p-2">
        <Search className="text-blue-300/70 ml-2" size={18} />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a product URL to analyze (Shopify, WooCommerce, AliExpress, etc.)"
          className="flex-1 bg-transparent outline-none text-blue-100 placeholder-blue-300/50 px-2 py-2"
        />
        <button disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium disabled:opacity-60">
          {loading ? <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" size={16}/> Analyzing</span> : 'Analyze'}
        </button>
      </form>
      {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
    </div>
  )
}
