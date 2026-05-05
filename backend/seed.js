import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Crypto from './models/Crypto.js'

dotenv.config()

const cryptos = [
  { name: 'Bitcoin',   symbol: 'BTC',  price: 67234.52, image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',        change24h: 2.34  },
  { name: 'Ethereum',  symbol: 'ETH',  price: 3456.78,  image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',       change24h: -1.23 },
  { name: 'Tether',    symbol: 'USDT', price: 1.00,     image: 'https://cryptologos.cc/logos/tether-usdt-logo.png',        change24h: 0.01  },
  { name: 'BNB',       symbol: 'BNB',  price: 584.32,   image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',            change24h: 3.12  },
  { name: 'Solana',    symbol: 'SOL',  price: 142.67,   image: 'https://cryptologos.cc/logos/solana-sol-logo.png',         change24h: 5.67  },
  { name: 'XRP',       symbol: 'XRP',  price: 0.5234,   image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',           change24h: -0.45 },
  { name: 'Cardano',   symbol: 'ADA',  price: 0.4521,   image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',        change24h: 1.89  },
  { name: 'Dogecoin',  symbol: 'DOGE', price: 0.0823,   image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',      change24h: -2.34 },
  { name: 'Polkadot',  symbol: 'DOT',  price: 6.78,     image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',  change24h: 4.12  },
  { name: 'Chainlink', symbol: 'LINK', price: 14.32,    image: 'https://cryptologos.cc/logos/chainlink-link-logo.png',    change24h: 6.78  },
  { name: 'Litecoin',  symbol: 'LTC',  price: 72.45,    image: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',      change24h: -0.89 },
  { name: 'Stellar',   symbol: 'XLM',  price: 0.1123,   image: 'https://cryptologos.cc/logos/stellar-xlm-logo.png',       change24h: 3.45  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    await Crypto.deleteMany({})
    console.log('🗑️  Cleared existing cryptos')

    await Crypto.insertMany(cryptos)
    console.log(`🌱 Seeded ${cryptos.length} cryptocurrencies`)

    await mongoose.disconnect()
    console.log('✅ Done. MongoDB disconnected.')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error.message)
    process.exit(1)
  }
}

seed()
