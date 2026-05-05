import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HiArrowLeft, HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import Button from '../components/common/Button'
import { api } from '../api/api'

const COLORS = ['#F7931A','#627EEA','#26A17B','#F3BA2F','#9945FF','#00AAE4','#0033AD','#C2A633','#E6007A','#2A5ADA','#BFBBBB','#14B6E7']

function generateDetailChart(isPositive) {
  const points = []
  let y = isPositive ? 180 : 70
  for (let i = 0; i <= 60; i++) {
    const x = i * 10
    y += (Math.random() - (isPositive ? 0.4 : 0.6)) * 12
    y = Math.max(20, Math.min(230, y))
    points.push(`${x},${y}`)
  }
  return points.join(' ')
}

const AssetDetail = () => {
  const { id } = useParams()
  const [asset, setAsset] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAllCryptos()
      .then((data) => {
        const found = data.data.find((c) => c._id === id)
        if (found) {
          const idx = data.data.indexOf(found)
          setAsset({ ...found, id: found._id, color: COLORS[idx % COLORS.length] })
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-cb-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-cb-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!asset) return (
    <div className="min-h-screen bg-cb-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-cb-dark mb-4">Asset not found</h2>
        <Button variant="primary" to="/explore">Back to Explore</Button>
      </div>
    </div>
  )

  const isPositive = asset.change24h >= 0
  const chartPoints = generateDetailChart(isPositive)
  const stats = [
    { label: 'Symbol', value: asset.symbol },
    { label: '24h Change', value: `${isPositive ? '+' : ''}${asset.change24h}%` },
    { label: 'All-time High (est.)', value: `$${(asset.price * 1.8).toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
    { label: 'Listed', value: new Date(asset.createdAt).toLocaleDateString() },
  ]

  return (
    <div className="bg-cb-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/explore" className="inline-flex items-center gap-2 text-cb-gray-500 hover:text-cb-blue transition-colors mb-8">
          <HiArrowLeft className="w-5 h-5"/><span className="font-medium">Back to Explore</span>
        </Link>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-cb-gray-200 p-8 mb-6">
              <div className="flex items-center gap-4 mb-6">
                {asset.image ? (
                  <img src={asset.image} alt={asset.name} className="w-14 h-14 rounded-full object-contain" onError={(e) => { e.target.onerror=null; e.target.style.display='none' }}/>
                ) : (
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{backgroundColor: asset.color}}>{asset.symbol.charAt(0)}</div>
                )}
                <div><h1 className="text-2xl font-bold text-cb-dark">{asset.name}</h1><p className="text-cb-gray-500">{asset.symbol}</p></div>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-extrabold text-cb-dark mb-2">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {isPositive ? <HiArrowTrendingUp className="w-4 h-4"/> : <HiArrowTrendingDown className="w-4 h-4"/>}
                  {isPositive ? '+' : ''}{asset.change24h}% (24h)
                </div>
              </div>
              <div className="h-64 bg-cb-gray-50 rounded-xl overflow-hidden">
                <svg viewBox="0 0 600 250" className="w-full h-full" preserveAspectRatio="none">
                  <defs><linearGradient id="detailGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style={{stopColor:asset.color,stopOpacity:0.2}}/><stop offset="100%" style={{stopColor:asset.color,stopOpacity:0}}/></linearGradient></defs>
                  <polygon fill="url(#detailGrad)" points={`${chartPoints} 600,250 0,250`}/>
                  <polyline fill="none" stroke={asset.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={chartPoints}/>
                </svg>
              </div>
              <div className="flex gap-2 mt-4">
                {['1H','1D','1W','1M','1Y','All'].map((period) => (
                  <button key={period} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${period==='1D' ? 'bg-cb-blue text-white' : 'text-cb-gray-500 hover:bg-cb-gray-100'}`}>{period}</button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-cb-gray-200 p-8">
              <h2 className="text-xl font-bold text-cb-dark mb-6">{asset.name} statistics</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center py-3 border-b border-cb-gray-100">
                    <span className="text-cb-gray-500">{stat.label}</span>
                    <span className={`font-semibold ${stat.label==='24h Change' ? (isPositive ? 'text-green-600' : 'text-red-600') : 'text-cb-dark'}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-cb-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-cb-dark mb-6">Buy {asset.name}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-cb-gray-500 mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cb-gray-400 font-medium">$</span>
                  <input type="number" placeholder="0.00" className="w-full pl-8 pr-4 py-3 border border-cb-gray-200 rounded-xl text-cb-dark focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent"/>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {['$25','$50','$100','$500'].map((amount) => (
                  <button key={amount} className="flex-1 py-2 text-sm font-medium text-cb-gray-600 bg-cb-gray-50 rounded-lg hover:bg-cb-gray-100 transition-colors">{amount}</button>
                ))}
              </div>
              <div className="flex justify-between text-sm mb-6">
                <span className="text-cb-gray-500">1 {asset.symbol} ≈</span>
                <span className="font-medium text-cb-dark">${asset.price.toLocaleString()}</span>
              </div>
              <div className="space-y-3">
                <Button variant="primary" className="w-full" to="/signup">Buy {asset.symbol}</Button>
                <Button variant="outline" className="w-full" to="/signup">Sell {asset.symbol}</Button>
              </div>
              <p className="text-xs text-cb-gray-400 text-center mt-4">Sign up to start trading {asset.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetDetail
