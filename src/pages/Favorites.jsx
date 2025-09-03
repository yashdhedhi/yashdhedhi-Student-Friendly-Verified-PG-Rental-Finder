import React, { useEffect, useState } from 'react';
import './Favorites.css';

const API_URL = 'http://localhost:5000/api';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok && data.favorites) {
        setFavorites(data.favorites);
      } else {
        console.error('Failed to load favorites');
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeCity = async (cityName) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const encodedCity = encodeURIComponent(cityName);
      const res = await fetch(`${API_URL}/favorites/${encodedCity}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok && data.favorites) {
        setFavorites(data.favorites);
      } else {
        alert(data.message || 'Failed to remove city');
      }
    } catch (err) {
      console.error('Error removing city:', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="favorites-container">
      <h2>⭐ Your Favorite Cities</h2>

      {loading ? (
        <p className="loading">Loading your favorites...</p>
      ) : favorites.length === 0 ? (
        <p className="empty">You haven't saved any cities yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((city, index) => (
            <li key={index} className="favorite-item">
              {city}
              <button onClick={() => removeCity(city)} className="remove-button">
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
