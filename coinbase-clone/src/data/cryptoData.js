export const cryptoAssets = [
  { id: '1', name: 'Bitcoin',   symbol: 'BTC',  price: 67234.52, change24h: 2.34,  marketCap: '$1.32T', color: '#F7931A', image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'       },
  { id: '2', name: 'Ethereum',  symbol: 'ETH',  price: 3456.78,  change24h: -1.23, marketCap: '$415.2B',color: '#627EEA', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'      },
  { id: '3', name: 'Tether',    symbol: 'USDT', price: 1.00,     change24h: 0.01,  marketCap: '$95.8B', color: '#26A17B', image: 'https://cryptologos.cc/logos/tether-usdt-logo.png'       },
  { id: '4', name: 'BNB',       symbol: 'BNB',  price: 584.32,   change24h: 3.12,  marketCap: '$89.5B', color: '#F3BA2F', image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'           },
  { id: '5', name: 'Solana',    symbol: 'SOL',  price: 142.67,   change24h: 5.67,  marketCap: '$63.2B', color: '#9945FF', image: 'https://cryptologos.cc/logos/solana-sol-logo.png'        },
  { id: '6', name: 'XRP',       symbol: 'XRP',  price: 0.5234,   change24h: -0.45, marketCap: '$28.7B', color: '#00AAE4', image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png'          },
  { id: '7', name: 'Cardano',   symbol: 'ADA',  price: 0.4521,   change24h: 1.89,  marketCap: '$16.0B', color: '#0033AD', image: 'https://cryptologos.cc/logos/cardano-ada-logo.png'       },
  { id: '8', name: 'Dogecoin',  symbol: 'DOGE', price: 0.0823,   change24h: -2.34, marketCap: '$11.7B', color: '#C2A633', image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png'     },
  { id: '9', name: 'Polkadot',  symbol: 'DOT',  price: 6.78,     change24h: 4.12,  marketCap: '$8.7B',  color: '#E6007A', image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' },
  { id: '10',name: 'Chainlink', symbol: 'LINK', price: 14.32,    change24h: 6.78,  marketCap: '$7.8B',  color: '#2A5ADA', image: 'https://cryptologos.cc/logos/chainlink-link-logo.png'   },
  { id: '11',name: 'Litecoin',  symbol: 'LTC',  price: 72.45,    change24h: -0.89, marketCap: '$5.4B',  color: '#BFBBBB', image: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png'     },
  { id: '12',name: 'Stellar',   symbol: 'XLM',  price: 0.1123,   change24h: 3.45,  marketCap: '$3.2B',  color: '#14B6E7', image: 'https://cryptologos.cc/logos/stellar-xlm-logo.png'      },
]

export const getAssetById = (id) => cryptoAssets.find((a) => a.id === id)
