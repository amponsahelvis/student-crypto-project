import express from 'express'
import {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
} from '../controllers/cryptoController.js'

const router = express.Router()

// IMPORTANT: specific routes must come BEFORE any parameterized routes
router.get('/gainers', getTopGainers)
router.get('/new', getNewListings)
router.get('/', getAllCryptos)
router.post('/', addCrypto)

export default router
