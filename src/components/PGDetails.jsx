import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PGDetails.css';

const curatedImages = [
  "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
  "https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg",
  "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
  "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg",
  "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
  "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
  "https://images.pexels.com/photos/269262/pexels-photo-269262.jpeg",
  "https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg",
  "https://images.pexels.com/photos/271647/pexels-photo-271647.jpeg",
  "https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg",
  "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
  "https://images.pexels.com/photos/272474/pexels-photo-272474.jpeg",
  "https://images.pexels.com/photos/1866144/pexels-photo-1866144.jpeg",
  "https://images.pexels.com/photos/261398/pexels-photo-261398.jpeg",
  "https://images.pexels.com/photos/1866146/pexels-photo-1866146.jpeg"
];

const PGDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [pgImages, setPgImages] = useState([]);

  const pg = state?.pg;
  const pgId = pg?._id || pg?.id || null;
  const properties = pg?.properties || {};
  const name = properties.name || 'Unnamed PG/Hostel';
  const address_line1 = properties.address_line1 || 'Not Available';
  const address_line2 = properties.address_line2 || 'Not Available';
  const lat = properties.lat;
  const lon = properties.lon;

  const {
    price,
    gender,
    amenities,
    contactInfo,
    reviews,
    photos
  } = pg || {};

  const defaultAmenities = ['WiFi', 'Laundry', 'Meals', 'Parking'];
  const defaultContact = { name: 'PG Owner', phone: '9876543210', email: 'owner@example.com' };
  const defaultReviews = [
    { user: 'Amit', text: 'Comfortable and clean stay.' },
    { user: 'Priya', text: 'Good food and location.' }
  ];

  const hasValidPgImages = photos && Array.isArray(photos) && photos.length > 0;

  useEffect(() => {
    if (hasValidPgImages) {
      setPgImages(photos);
    } else {
      // Show 4 random images from curated list
      const shuffled = [...curatedImages].sort(() => 0.5 - Math.random());
      setPgImages(shuffled.slice(0, 4));
    }
  }, [pgId, photos, hasValidPgImages]);

  if (!pg) {
    return (
      <div className="pg-details-container">
        <p>No PG data found. Please go back and try again.</p>
        <button onClick={() => navigate(-1)} className="back-button">⬅ Go Back</button>
      </div>
    );
  }

  return (
    <div className="pg-details-container">
      <button onClick={() => navigate(-1)} className="back-button">⬅ Go Back</button>

      <h2>{name}</h2>
      <p><strong>Address Line 1:</strong> {address_line1}</p>
      <p><strong>Address Line 2:</strong> {address_line2}</p>
      <p><strong>Rent:</strong> ₹{price || 'N/A'}</p>
      <p><strong>Gender Allowed:</strong> {gender || 'N/A'}</p>

      {/* Images */}
      <div className="pg-images">
        {pgImages.length > 0 ? (
          pgImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`PG view ${idx + 1}`}
              className="pg-image"
              style={{
                width: '220px',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginRight: '12px'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/400x250?text=No+Image";
              }}
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>

      {/* Amenities */}
      <div className="pg-section">
        <h3>Amenities</h3>
        <ul>
          {(amenities || defaultAmenities).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div className="pg-section">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> {(contactInfo && contactInfo.name) || defaultContact.name}</p>
        <p><strong>Phone:</strong> {(contactInfo && contactInfo.phone) || defaultContact.phone}</p>
        <p><strong>Email:</strong> {(contactInfo && contactInfo.email) || defaultContact.email}</p>
      </div>

      {/* Reviews */}
      <div className="pg-section">
        <h3>Reviews</h3>
        {(reviews || defaultReviews).map((rev, idx) => (
          <div key={idx} className="review">
            <strong>{rev.user}:</strong> {rev.text}
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="pg-section">
        <h3>Location Map</h3>
        {lat && lon ? (
          <iframe
            title="PG location map"
            width="400"
            height="200"
            frameBorder="0"
            style={{ border: "1px solid #ccc", borderRadius: 8 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.02},${lat - 0.01},${lon + 0.02},${lat + 0.01}&layer=mapnik&marker=${lat},${lon}`}
            allowFullScreen
          ></iframe>
        ) : (
          <p>Location data not available.</p>
        )}
      </div>
    </div>
  );
};

export default PGDetails;
