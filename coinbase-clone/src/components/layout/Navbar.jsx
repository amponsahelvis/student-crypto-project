import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Learn', path: '/learn' },
    { name: 'Individuals', path: '/' },
    { name: 'Businesses', path: '/' },
    { name: 'Developers', path: '/' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-cb-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-cb-blue rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-2.13c-1.62-.26-2.89-1.18-3.22-2.74l1.88-.38c.23 1.07 1.26 1.5 2.34 1.5 1.16 0 2-.5 2-1.38 0-.78-.62-1.12-2.12-1.5C10.18 9.5 8.5 8.88 8.5 7.25c0-1.5 1.25-2.5 2.5-2.75V2.5h2v2c1.38.25 2.38 1.12 2.62 2.5l-1.88.38C13.5 6.5 12.74 6 11.88 6c-1 0-1.88.5-1.88 1.25 0 .88.88 1.12 2.38 1.5 1.88.5 3.12 1.12 3.12 2.75 0 1.62-1.38 2.62-2.5 2.88V16.5h-2z"/></svg>
            </div>
            <span className="text-xl font-bold text-cb-dark">Crypto App</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive(link.path) ? 'text-cb-blue bg-blue-50' : 'text-cb-gray-600 hover:text-cb-dark hover:bg-cb-gray-50'
                }`}>{link.name}</Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" to="/profile">{user.name.split(' ')[0]}</Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>Sign out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" to="/signin">Sign in</Button>
                <Button variant="primary" size="sm" to="/signup">Sign up</Button>
              </>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-lg text-cb-gray-600 hover:bg-cb-gray-100 transition-colors">
            {isMenuOpen ? <HiX size={24}/> : <HiMenu size={24}/>}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-cb-gray-200 py-4 animate-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-colors duration-200 ${
                    isActive(link.path) ? 'text-cb-blue bg-blue-50' : 'text-cb-gray-600 hover:text-cb-dark hover:bg-cb-gray-50'
                  }`}>{link.name}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-cb-gray-200">
              {user ? (
                <>
                  <Button variant="ghost" to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Button>
                  <Button variant="outline" onClick={handleLogout}>Sign out</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" to="/signin" onClick={() => setIsMenuOpen(false)}>Sign in</Button>
                  <Button variant="primary" to="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
