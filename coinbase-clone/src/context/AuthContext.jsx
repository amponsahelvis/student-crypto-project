import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from cookie on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await api.getProfile()
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    restoreSession()
  }, [])

  const login = async (email, password) => {
    const data = await api.login(email, password)
    setUser(data.user)
    return data
  }

  const register = async (name, email, password) => {
    const data = await api.register(name, email, password)
    setUser(data.user)
    return data
  }

  const logout = async () => {
    await api.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
