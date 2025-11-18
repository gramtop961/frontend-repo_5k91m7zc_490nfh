import { Search } from 'lucide-react'

export default function Header({ onSearch }) {
  return (
    <header className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-10 h-10" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">DropScout</h1>
            <p className="text-sm text-blue-200/80">Find winning dropshipping products and analyze them instantly</p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const q = new FormData(e.currentTarget).get('q')?.toString() || ''
            onSearch?.(q)
          }}
          className="hidden md:flex items-center bg-slate-800/60 border border-blue-500/20 rounded-xl overflow-hidden"
        >
          <input
            name="q"
            placeholder="Search niches, domains, or keywords..."
            className="px-4 py-2 bg-transparent outline-none text-blue-100 placeholder-blue-300/50 w-72"
          />
          <button className="px-3 py-2 text-blue-200 hover:text-white">
            <Search size={18} />
          </button>
        </form>
      </div>
    </header>
  )
}
