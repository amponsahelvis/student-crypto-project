import { Link } from 'react-router-dom'

function generateSparkline(isPositive) {
  const points = []
  let y = isPositive ? 35 : 15
  for (let i = 0; i <= 20; i++) {
    const x = i * 5
    y += (Math.random() - (isPositive ? 0.45 : 0.55)) * 5
    y = Math.max(5, Math.min(45, y))
    points.push(`${x},${y}`)
  }
  return points.join(' ')
}

const CryptoCard = ({ asset }) => {
  const isPositive = asset.change24h >= 0
  const sparkPoints = generateSparkline(isPositive)
  const color = isPositive ? '#22c55e' : '#ef4444'
  const fillColor = isPositive ? '#dcfce7' : '#fee2e2'
  const closedPath = `${sparkPoints} 100,50 0,50`

  return (
    <Link
      to={`/asset/${asset.id}`}
      className="bg-white rounded-2xl border border-cb-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer block"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: asset.color }}
        >
          {asset.symbol ? asset.symbol.charAt(0) : '?'}
        </div>
        <div>
          <p className="font-semibold text-cb-dark">{asset.name}</p>
          <p className="text-sm text-cb-gray-400">{asset.symbol}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-xl font-bold text-cb-dark">
          ${typeof asset.price === 'number' ? asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : asset.price}
        </p>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
        }`}>
          {isPositive ? '+' : ''}{asset.change24h}%
        </span>
      </div>

      <div className="h-12 w-full overflow-hidden">
        <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
          <polygon fill={fillColor} fillOpacity="0.5" points={closedPath} />
          <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={sparkPoints} />
        </svg>
      </div>
    </Link>
  )
}

export default CryptoCard
