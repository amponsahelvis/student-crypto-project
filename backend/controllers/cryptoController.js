import Crypto from '../models/Crypto.js'

// GET /api/crypto — all cryptos
export const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: 1 })
    res.status(200).json({ success: true, data: cryptos })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/crypto/gainers — top gainers sorted desc
export const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } }).sort({ change24h: -1 })
    res.status(200).json({ success: true, data: gainers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/crypto/new — newest listings first
export const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: newListings })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/crypto — add new crypto
export const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body

    if (!name || !symbol || price === undefined || !image || change24h === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, symbol, price, image, change24h',
      })
    }

    const crypto = await Crypto.create({ name, symbol, price, image, change24h })
    res.status(201).json({ success: true, data: crypto })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
