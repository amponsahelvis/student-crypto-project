import { useState, useMemo } from 'react'
import Card from '../components/common/Card'

const articles = [
  {
    id: 1, category: 'Crypto Basics', readTime: '4 min read', color: '#F7931A',
    title: 'What is Bitcoin?',
    description: 'Bitcoin is the first and most well-known cryptocurrency. Learn about what makes it valuable and how it works.',
  },
  {
    id: 2, category: 'Crypto Basics', readTime: '5 min read', color: '#627EEA',
    title: 'What is Ethereum?',
    description: 'Ethereum is more than just a cryptocurrency. Discover the platform that enables smart contracts and decentralized apps.',
  },
  {
    id: 3, category: 'Crypto Basics', readTime: '4 min read', color: '#0052FF',
    title: 'What is a blockchain?',
    description: 'A blockchain is a distributed ledger technology. Learn about the fundamental technology powering cryptocurrencies.',
  },
  {
    id: 4, category: 'Tips & Tutorials', readTime: '6 min read', color: '#9945FF',
    title: 'How to buy your first crypto',
    description: 'A step-by-step beginner guide to purchasing your first cryptocurrency safely and securely.',
  },
  {
    id: 5, category: 'Tips & Tutorials', readTime: '5 min read', color: '#26A17B',
    title: 'Understanding crypto wallets',
    description: 'Hot wallets, cold wallets, seed phrases — learn everything you need to keep your crypto safe.',
  },
  {
    id: 6, category: 'Market Updates', readTime: '3 min read', color: '#F3BA2F',
    title: 'What drives crypto prices?',
    description: 'Supply and demand, market sentiment, regulations — explore the key factors that move crypto markets.',
  },
  {
    id: 7, category: 'Crypto Basics', readTime: '4 min read', color: '#E6007A',
    title: 'What is DeFi?',
    description: 'Decentralized Finance is reshaping banking and lending. Understand what DeFi is and why it matters.',
  },
  {
    id: 8, category: 'Tips & Tutorials', readTime: '7 min read', color: '#2A5ADA',
    title: 'Crypto tax basics',
    description: 'Navigating crypto taxes can be tricky. Here are the key things to know to stay compliant.',
  },
  {
    id: 9, category: 'Market Updates', readTime: '4 min read', color: '#00AAE4',
    title: 'Bitcoin halving explained',
    description: 'Every four years, Bitcoin halving cuts miner rewards in half. Learn why this event matters for price.',
  },
]

const FILTERS = ['All', 'Crypto Basics', 'Tips & Tutorials', 'Market Updates']

const Learn = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return articles
    return articles.filter((a) => a.category === activeFilter)
  }, [activeFilter])

  return (
    <div>
      {/* Hero */}
      <section className="bg-cb-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Learn about crypto</h1>
          <p className="text-lg text-cb-gray-400 max-w-2xl mx-auto">
            Explore the world of cryptocurrency with guides and tutorials from beginner to advanced topics.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-cb-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-cb-blue text-white'
                    : 'bg-white text-cb-gray-600 border border-cb-gray-200 hover:bg-cb-gray-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                {/* Coloured image area */}
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ backgroundColor: article.color }}
                >
                  <span className="text-white/40 text-3xl font-extrabold">What is</span>
                </div>
                <div className="p-5">
                  <span className="inline-block text-cb-blue text-xs font-semibold bg-blue-50 rounded-full px-3 py-1 mb-3">
                    {article.category}
                  </span>
                  <h2 className="text-lg font-bold text-cb-dark mb-2">{article.title}</h2>
                  <p className="text-cb-gray-500 text-sm leading-relaxed mb-3">{article.description}</p>
                  <p className="text-xs text-cb-gray-400">{article.readTime}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Learn
