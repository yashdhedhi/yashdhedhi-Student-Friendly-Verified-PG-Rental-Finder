import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const API_KEY = '3783b35de8344cdd84da660dc8eff67d';
const BACKEND_URL = 'http://localhost:5000/api/favorites';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    setToken(storedToken);

    axios
      .get(BACKEND_URL, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        setFavorites(res.data.favorites || []);
      })
      .catch((err) => {
        console.error('Failed to load favorites:', err);
      });
  }, []);

  const handleSearch = async () => {
    if (!city) return alert("Please enter a city name");

    setLoading(true);
    setPlaces([]);

    try {
      const geoRes = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=${API_KEY}`
      );

      const location = geoRes.data.features[0]?.properties;
      if (!location) {
        alert("City not found");
        setLoading(false);
        return;
      }

      const { lon, lat } = location;

      const placesRes = await axios.get(
        `https://api.geoapify.com/v2/places?categories=accommodation&filter=circle:${lon},${lat},5000&limit=20&apiKey=${API_KEY}`
      );

      const photoPool = [
        '/images/pg1.jpg',
        '/images/pg2.jpg',
        '/images/pg3.jpg',
        '/images/pg4.jpg',
        '/images/pg5.jpg',
        '/images/pg6.jpg',
        '/images/pg7.jpg',
        '/images/pg8.jpg',
        '/images/pg9.jpg',
      ];

      const enrichedPlaces = placesRes.data.features.map((place, index) => {
        const randomPrice = Math.floor(Math.random() * 10000);
        const genderOptions = ['Male', 'Female', 'Unisex'];
        const randomGender = genderOptions[Math.floor(Math.random() * genderOptions.length)];

        return {
          ...place,
          id: `${place.properties.name || 'PG'}-${index}`,
          price: randomPrice,
          gender: randomGender,
          images: [
            photoPool[(index * 3) % photoPool.length],
            photoPool[(index * 3 + 1) % photoPool.length],
            photoPool[(index * 3 + 2) % photoPool.length],
          ]
        };
      });

      setPlaces(enrichedPlaces);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch PG data");
    }

    setLoading(false);
  };

  const handleAddFavorite = async () => {
    if (!token) return alert("Login required to save favorites");

    const cityName = city.trim();
    if (!cityName) return alert("Please enter a city");

    try {
      const res = await axios.post(
        BACKEND_URL,
        { city: cityName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        setFavorites(res.data.favorites);
        alert("City saved to favorites ✅");
      } else {
        alert("Failed to save city");
      }
    } catch (err) {
      console.error("Failed to save city:", err.response?.data || err.message);
      alert("Could not save city to favorites");
    }
  };

  const handleRemoveFavorite = async (cityToRemove) => {
    if (!token) return;

    try {
      const res = await axios.delete(
        `${BACKEND_URL}/${encodeURIComponent(cityToRemove)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setFavorites(res.data.favorites);
      }
    } catch (err) {
      console.error("Failed to remove favorite:", err.response?.data || err.message);
    }
  };

  const filteredPlaces = places.filter((place) => {
    const genderMatch = !genderFilter || place.gender === genderFilter;
    const priceMatch =
      !priceFilter ||
      (priceFilter === 'low' && place.price < 4000) ||
      (priceFilter === 'mid' && place.price >= 4000 && place.price <= 8000) ||
      (priceFilter === 'high' && place.price > 8000);
    return genderMatch && priceMatch;
  });

  return (
    <div className="search-container">
      <h2>🔍 Search PG in Your Favorite City</h2>

      <div className="search-input-area">
        <input
          type="text"
          value={city}
          placeholder="Enter city name (e.g., Mumbai)"
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <button onClick={handleAddFavorite} className="favorite-button">
          ⭐ Save to Favorites
        </button>
      </div>

      <div className="filter-bar">
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">All Prices</option>
          <option value="low">Below ₹4000</option>
          <option value="mid">₹4000 - ₹8000</option>
          <option value="high">Above ₹8000</option>
        </select>

        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <div className="favorites-list">
        <h3>⭐ Favorite Cities</h3>
        {favorites.length === 0 && <p>No favorites yet.</p>}
        {favorites.map((fav, idx) => (
          <div key={idx} className="favorite-city">
            <span>{fav}</span>
            <button onClick={() => handleRemoveFavorite(fav)}>❌</button>
          </div>
        ))}
      </div>

      {loading && <p>Loading PGs...</p>}
      {!loading && filteredPlaces.length === 0 && places.length > 0 && (
        <p>No PGs match the selected filters.</p>
      )}

      <div className="search-results">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="pg-card"
            onClick={() => navigate(`/pg/${place.id}`, { state: { pg: place } })}
            style={{ cursor: 'pointer' }}
          >
            <img src={place.images[0]} alt="PG" className="pg-thumb" />
            <h3>{place.properties.name || 'Unnamed PG/Hostel'}</h3>
            <p>{place.properties.address_line1}</p>
            <p>{place.properties.address_line2}</p>
            <p><strong>Rent:</strong> ₹{place.price}</p>
            <p><strong>Gender:</strong> {place.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
