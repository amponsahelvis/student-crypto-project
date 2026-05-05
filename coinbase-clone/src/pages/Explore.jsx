import { useState, useMemo, useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import CryptoCard from '../components/crypto/CryptoCard'
import { api } from '../api/api'

const COLORS = ['#F7931A','#627EEA','#26A17B','#F3BA2F','#9945FF','#00AAE4','#0033AD','#C2A633','#E6007A','#2A5ADA','#BFBBBB','#14B6E7']

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [cryptoAssets, setCryptoAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const filters = ['All', 'Gainers', 'Losers', 'DeFi']

  useEffect(() => {
    api.getAllCryptos()
      .then((data) => {
        setCryptoAssets(data.data.map((c, i) => ({ ...c, id: c._id, color: COLORS[i % COLORS.length] })))
      })
      .catch((err) => console.error('Failed to fetch cryptos:', err.message))
      .finally(() => setLoading(false))
  }, [])

  const filteredAssets = useMemo(() => {
    let assets = [...cryptoAssets]
    if (searchQuery) assets = assets.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
    switch (activeFilter) {
      case 'Gainers': assets = assets.filter((a) => a.change24h > 0).sort((a, b) => b.change24h - a.change24h); break
      case 'Losers':  assets = assets.filter((a) => a.change24h < 0).sort((a, b) => a.change24h - b.change24h); break
      case 'DeFi':    assets = assets.filter((a) => ['ETH','LINK','DOT','SOL','ADA'].includes(a.symbol)); break
      default: break
    }
    return assets
  }, [searchQuery, activeFilter, cryptoAssets])

  return (
    <div className="bg-cb-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cb-dark mb-2">Explore assets</h1>
          <p className="text-cb-gray-500 text-lg">Discover and explore all cryptocurrencies available</p>
        </div>
        <div className="relative mb-6">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cb-gray-400 w-5 h-5"/>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for an asset..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-cb-gray-200 rounded-xl text-cb-dark placeholder-cb-gray-400 focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent transition-all"/>
        </div>
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeFilter === filter ? 'bg-cb-blue text-white' : 'bg-white text-cb-gray-600 hover:bg-cb-gray-100 border border-cb-gray-200'
              }`}>{filter}</button>
          ))}
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_,i) => <div key={i} className="h-40 bg-white rounded-2xl border border-cb-gray-200 animate-pulse"/>)}
          </div>
        ) : filteredAssets.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAssets.map((asset) => <CryptoCard key={asset.id} asset={asset}/>)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-cb-gray-500 text-lg">No assets found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore
