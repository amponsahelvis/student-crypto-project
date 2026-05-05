import { Link } from 'react-router-dom'

const CryptoRow = ({ asset, index }) => {
  const isPositive = asset.change24h >= 0

  return (
    <Link
      to={`/asset/${asset.id}`}
      className="grid grid-cols-12 items-center py-4 px-4 hover:bg-cb-gray-50 rounded-xl transition-colors cursor-pointer border-b border-cb-gray-100 group"
    >
      <div className="col-span-1 text-cb-gray-400 text-sm font-medium">{index + 1}</div>

      <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
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

      <div className="col-span-3 sm:col-span-2 text-right font-semibold text-cb-dark">
        ${typeof asset.price === 'number' ? asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : asset.price}
      </div>

      <div className={`col-span-3 sm:col-span-2 text-right font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{asset.change24h}%
      </div>

      <div className="hidden sm:block sm:col-span-2 text-right text-cb-gray-500">
        {asset.marketCap || 'N/A'}
      </div>

      <div className="hidden sm:block sm:col-span-2 text-right">
        <span className="px-4 py-1.5 text-sm font-semibold text-cb-blue border border-cb-blue rounded-full group-hover:bg-cb-blue group-hover:text-white transition-all duration-200">
          Buy
        </span>
      </div>
    </Link>
  )
}

export default CryptoRow
