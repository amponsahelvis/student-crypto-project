import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiShieldCheck, HiDeviceMobile, HiRefresh } from 'react-icons/hi'
import { HiArrowTrendingUp } from 'react-icons/hi2'
import Button from '../components/common/Button'
import CryptoRow from '../components/crypto/CryptoRow'
import { api } from '../api/api'

const COLORS = ['#F7931A','#627EEA','#26A17B','#F3BA2F','#9945FF','#00AAE4','#0033AD','#C2A633','#E6007A','#2A5ADA','#BFBBBB','#14B6E7']

const Home = () => {
  const [email, setEmail] = useState('')
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAllCryptos()
      .then((data) => {
        setCryptos(data.data.map((c, i) => ({ ...c, id: c._id, color: COLORS[i % COLORS.length], marketCap: 'N/A' })))
      })
      .catch((err) => console.error('Failed to fetch cryptos:', err.message))
      .finally(() => setLoading(false))
  }, [])

  const features = [
    { icon: HiShieldCheck, title: 'Secure storage', description: 'We store the vast majority of digital assets in secure offline storage. Cryptocurrency stored on our platform is covered by our insurance policy.' },
    { icon: HiDeviceMobile, title: 'Mobile apps', description: 'Stay on top of the markets with the app for Android or iOS. Trade crypto anytime, anywhere.' },
    { icon: HiRefresh, title: 'Recurring buys', description: 'Invest in cryptocurrency slowly over time by scheduling buys daily, weekly, or monthly.' },
  ]

  const stats = [
    { value: '$245B+', label: 'Quarterly volume traded' },
    { value: '100+', label: 'Countries supported' },
    { value: '200M+', label: 'Verified users' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cb-dark leading-tight mb-6">
                Jump start your{' '}<span className="text-cb-blue">crypto portfolio</span>
              </h1>
              <p className="text-lg text-cb-gray-600 mb-8 leading-relaxed">
                The easiest place to buy and sell cryptocurrency. Sign up and get started today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address"
                  className="flex-1 px-5 py-3.5 border border-cb-gray-300 rounded-full text-cb-dark placeholder-cb-gray-400 focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent transition-all" />
                <Button variant="primary" size="md" to="/signup">Get started <HiArrowRight className="ml-2" /></Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-[500px] bg-gradient-to-br from-cb-blue to-blue-700 rounded-[2.5rem] p-1 shadow-2xl shadow-blue-500/20">
                  <div className="w-full h-full bg-white rounded-[2.3rem] p-6 flex flex-col">
                    <div className="text-center mb-6">
                      <p className="text-sm text-cb-gray-500">Your balance</p>
                      <p className="text-3xl font-bold text-cb-dark mt-1">$12,458.32</p>
                      <p className="text-sm text-green-500 font-medium mt-1">+$432.12 (3.59%)</p>
                    </div>
                    <div className="flex-1 mb-4">
                      <svg viewBox="0 0 300 150" className="w-full h-full">
                        <defs><linearGradient id="heroChartGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style={{stopColor:'#0052FF',stopOpacity:0.15}}/><stop offset="100%" style={{stopColor:'#0052FF',stopOpacity:0}}/></linearGradient></defs>
                        <polygon fill="url(#heroChartGrad)" points="0,120 30,110 60,95 90,100 120,80 150,70 180,85 210,50 240,55 270,30 300,25 300,150 0,150"/>
                        <polyline fill="none" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" points="0,120 30,110 60,95 90,100 120,80 150,70 180,85 210,50 240,55 270,30 300,25"/>
                      </svg>
                    </div>
                    <div className="flex justify-around pt-3 border-t border-cb-gray-200">
                      {['Home','Trade','Pay'].map((label, i) => (
                        <div key={label} className="text-center">
                          <div className={`w-6 h-6 rounded-full mx-auto mb-1 ${i === 0 ? 'bg-cb-blue' : 'bg-cb-gray-200'}`}></div>
                          <span className="text-[10px] text-cb-gray-500">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl rotate-12 opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cb-blue rounded-full opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Table */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-cb-dark">Today's cryptocurrency prices</h2>
              <p className="text-cb-gray-500 mt-2">The global crypto market cap is $2.43T</p>
            </div>
            <Button variant="outline" size="sm" to="/explore">See all assets <HiArrowRight className="ml-2"/></Button>
          </div>
          <div className="grid grid-cols-12 items-center py-3 px-4 text-sm font-medium text-cb-gray-500 border-b-2 border-cb-gray-200">
            <div className="col-span-1">#</div>
            <div className="col-span-4 sm:col-span-3">Name</div>
            <div className="col-span-3 sm:col-span-2 text-right">Price</div>
            <div className="col-span-3 sm:col-span-2 text-right">Change</div>
            <div className="hidden sm:block sm:col-span-2 text-right">Market Cap</div>
            <div className="hidden sm:block sm:col-span-2 text-right">Trade</div>
          </div>
          {loading ? (
            <div className="space-y-3 mt-2">{[...Array(6)].map((_,i) => <div key={i} className="h-16 bg-cb-gray-100 rounded-xl animate-pulse"/>)}</div>
          ) : (
            cryptos.slice(0, 8).map((asset, index) => <CryptoRow key={asset.id} asset={asset} index={index}/>)
          )}
          <div className="text-center mt-8"><Button variant="primary" to="/explore">View all assets <HiArrowRight className="ml-2"/></Button></div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-cb-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-cb-dark mb-4">Create your cryptocurrency portfolio today</h2>
            <p className="text-lg text-cb-gray-500 max-w-2xl mx-auto">A variety of features that make it the best place to start trading</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-cb-gray-200 group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cb-blue transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-cb-blue group-hover:text-white transition-colors duration-300"/>
                </div>
                <h3 className="text-xl font-bold text-cb-dark mb-3">{feature.title}</h3>
                <p className="text-cb-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cb-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The most trusted cryptocurrency platform</h2>
            <p className="text-lg text-cb-gray-400 max-w-2xl mx-auto">Here are a few reasons why you should choose this platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl font-extrabold text-cb-blue mb-3">{stat.value}</p>
                <p className="text-cb-gray-400 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-cb-blue rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6"><HiShieldCheck className="w-7 h-7"/></div>
                <h3 className="text-2xl font-bold mb-3">Crypto Wallet</h3>
                <p className="text-white/80 mb-6 leading-relaxed">The self-custody wallet. Your keys, your crypto. Take control of your digital assets with the most trusted wallet.</p>
                <Button variant="white" size="md">Learn more <HiArrowRight className="ml-2"/></Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-cb-dark rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cb-blue/20 rounded-full translate-y-10 -translate-x-10"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6"><HiArrowTrendingUp className="w-7 h-7"/></div>
                <h3 className="text-2xl font-bold mb-3">Crypto Card</h3>
                <p className="text-white/80 mb-6 leading-relaxed">Spend your crypto anywhere. Earn up to 4% back in crypto rewards when you spend.</p>
                <Button variant="primary" size="md">Learn more <HiArrowRight className="ml-2"/></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cb-blue py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Get started with crypto today</h2>
          <p className="text-xl text-white/80 mb-10">Join the 200M+ people who buy, sell, and manage crypto.</p>
          <Button variant="white" size="lg" to="/signup">Sign up now <HiArrowRight className="ml-2"/></Button>
        </div>
      </section>
    </div>
  )
}

export default Home
