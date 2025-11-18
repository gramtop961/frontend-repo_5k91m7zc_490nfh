import { useState } from 'react'
import Header from './components/Header'
import Analyzer from './components/Analyzer'
import Discover from './components/Discover'

function App() {
  const [query, setQuery] = useState('pet')
  const [last, setLast] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.08),transparent_40%)]"></div>

      <Header onSearch={setQuery} />

      <main className="relative z-10 space-y-10 pt-10">
        <section className="space-y-6">
          <Analyzer onResult={(data) => { setLast(data); setQuery(data.source || ''); }} />
          {last && (
            <div className="max-w-3xl mx-auto px-6 text-blue-200/90">
              <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2">Latest analysis</h3>
                <p className="text-sm">{last.title || last.url}</p>
                {last.score && <p className="text-sm mt-1">Score: {last.score} • Source: {last.source}</p>}
              </div>
            </div>
          )}
        </section>

        <section className="relative">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Discover</h2>
            <p className="text-blue-300/70 text-sm">Showing results for “{query}”</p>
          </div>
          <Discover query={query} />
        </section>

        <footer className="text-center text-blue-300/60 py-10">
          Built with DropScout • Paste a product URL to analyze signals and discover related items
        </footer>
      </main>
    </div>
  )
}

export default App
