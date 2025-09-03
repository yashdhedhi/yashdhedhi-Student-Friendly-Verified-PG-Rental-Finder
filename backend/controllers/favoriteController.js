const User = require('../models/User');

// Get all favorite cities for a user
const getFavoriteCities = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch favorites', error: err.message });
  }
};

// Add a city to user's favorites
const addFavoriteCity = async (req, res) => {
  const { city } = req.body;

  if (!city) return res.status(400).json({ message: 'City is required' });

  try {
    const user = await User.findById(req.user.id);
    const normalizedCity = city.trim().toLowerCase();

    const alreadyExists = user.favorites.some(
      fav => fav.trim().toLowerCase() === normalizedCity
    );

    if (!alreadyExists) {
      user.favorites.push(city); // keep original format
      await user.save();
    }

    res.status(200).json({ message: 'City added to favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add favorite', error: err.message });
  }
};

// ✅ Remove a city from user's favorites
const removeFavoriteCity = async (req, res) => {
  const encodedCity = decodeURIComponent(req.params.city).trim().toLowerCase();

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const initialLength = user.favorites.length;

    user.favorites = user.favorites.filter(
      city => city.trim().toLowerCase() !== encodedCity
    );

    if (user.favorites.length === initialLength) {
      return res.status(404).json({ message: 'City not found in favorites' });
    }

    await user.save();
    res.status(200).json({ message: 'City removed from favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove favorite', error: err.message });
  }
};

module.exports = {
  addFavoriteCity,
  getFavoriteCities,
  removeFavoriteCity
};