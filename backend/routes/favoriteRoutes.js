const express = require('express');
const router = express.Router();
const {
  addFavoriteCity,
  getFavoriteCities,
  removeFavoriteCity
} = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected Routes
router.get('/', authMiddleware, getFavoriteCities);
router.post('/', authMiddleware, addFavoriteCity);
router.delete('/:city', authMiddleware, removeFavoriteCity); // 👈 DELETE route

module.exports = router;