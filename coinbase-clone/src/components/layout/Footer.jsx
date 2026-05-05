import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'

const footerLinks = {
  Products: ['Exchange', 'Wallet', 'USD Coin', 'Coinbase One', 'Coinbase Card', 'Coinbase Commerce'],
  Resources: ['Learn', 'Blog', 'Prices', 'Taxes', 'Developer Platform', 'Status'],
  Company:  ['About', 'Careers', 'Affiliates', 'Press', 'Legal & Privacy', 'Cookie Policy'],
  Support:  ['Help Center', 'Contact Us', 'Create Account', 'System Status', 'Supported Countries'],
}

const socialLinks = [
  { icon: FaXTwitter, href: '#', label: 'X / Twitter' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
]

const Footer = () => (
  <footer className="bg-cb-dark text-cb-gray-400">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cb-blue rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-2.13c-1.62-.26-2.89-1.18-3.22-2.74l1.88-.38c.23 1.07 1.26 1.5 2.34 1.5 1.16 0 2-.5 2-1.38 0-.78-.62-1.12-2.12-1.5C10.18 9.5 8.5 8.88 8.5 7.25c0-1.5 1.25-2.5 2.5-2.75V2.5h2v2c1.38.25 2.38 1.12 2.62 2.5l-1.88.38C13.5 6.5 12.74 6 11.88 6c-1 0-1.88.5-1.88 1.25 0 .88.88 1.12 2.38 1.5 1.88.5 3.12 1.12 3.12 2.75 0 1.62-1.38 2.62-2.5 2.88V16.5h-2z"/></svg>
          </div>
          <span className="text-white text-xl font-bold">Crypto App</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="text-white font-semibold mb-4">{category}</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}><a href="#" className="text-cb-gray-400 hover:text-white transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 pt-8">
        {/* Compliance: footer disclaimer */}
        <p className="text-center text-amber-400 text-xs mb-4 bg-gray-800 rounded-lg px-4 py-2">
          ⚠️ This is a student demo project. Not affiliated with Coinbase Inc. Do not enter real personal information or financial data.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-cb-gray-400 hover:bg-cb-blue hover:text-white transition-all duration-200">
                <social.icon size={16}/>
              </a>
            ))}
          </div>
          <p className="text-cb-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Crypto App — Student Project. Not affiliated with Coinbase.
          </p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
