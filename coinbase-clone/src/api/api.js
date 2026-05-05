const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const handleResponse = async (res) => {
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const api = {
  async register(name, email, password) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })
    return handleResponse(res)
  },

  async login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(res)
  },

  async getProfile() {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      credentials: 'include',
    })
    return handleResponse(res)
  },

  async logout() {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    return handleResponse(res)
  },

  async getAllCryptos() {
    const res = await fetch(`${BASE_URL}/crypto`, { credentials: 'include' })
    return handleResponse(res)
  },

  async getTopGainers() {
    const res = await fetch(`${BASE_URL}/crypto/gainers`, { credentials: 'include' })
    return handleResponse(res)
  },

  async getNewListings() {
    const res = await fetch(`${BASE_URL}/crypto/new`, { credentials: 'include' })
    return handleResponse(res)
  },

  async addCrypto(cryptoData) {
    const res = await fetch(`${BASE_URL}/crypto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(cryptoData),
    })
    return handleResponse(res)
  },
}
