import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(formData.email, formData.password)
      navigate('/profile')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cb-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-cb-blue rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-2.13c-1.62-.26-2.89-1.18-3.22-2.74l1.88-.38c.23 1.07 1.26 1.5 2.34 1.5 1.16 0 2-.5 2-1.38 0-.78-.62-1.12-2.12-1.5C10.18 9.5 8.5 8.88 8.5 7.25c0-1.5 1.25-2.5 2.5-2.75V2.5h2v2c1.38.25 2.38 1.12 2.62 2.5l-1.88.38C13.5 6.5 12.74 6 11.88 6c-1 0-1.88.5-1.88 1.25 0 .88.88 1.12 2.38 1.5 1.88.5 3.12 1.12 3.12 2.75 0 1.62-1.38 2.62-2.5 2.88V16.5h-2z"/></svg>
            </div>
            <span className="text-2xl font-bold text-cb-dark">Crypto App</span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-cb-gray-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-cb-dark text-center mb-2">Sign in</h1>
          <p className="text-cb-gray-500 text-center mb-2">
            Not registered yet?{' '}<Link to="/signup" className="text-cb-blue hover:underline font-medium">Sign up</Link>
          </p>
          {/* Compliance: demo note */}
          <p className="text-center text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-6">
            🔒 Demo app – do not use your real password
          </p>
          {error && <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cb-gray-700 mb-1.5">Email</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required
                className="w-full px-4 py-3 border border-cb-gray-200 rounded-xl text-cb-dark placeholder-cb-gray-400 focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent transition-all"/>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-cb-gray-700">Password</label>
                <a href="#" className="text-sm text-cb-blue hover:underline">Forgot password?</a>
              </div>
              <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required
                className="w-full px-4 py-3 border border-cb-gray-200 rounded-xl text-cb-dark placeholder-cb-gray-400 focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent transition-all"/>
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
