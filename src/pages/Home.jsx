import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Your existing CSS

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to <span>PG Finder 🏠</span></h1>
      <p>Find your perfect Paying Guest accommodation with filters and location-based search.</p>

      <div className="button-group">
        <Link to="/search">🔍 Search PGs</Link>
        <Link to="/favorites">❤ View Favorites</Link>
        <Link to="/dashboard">📊 Dashboard</Link>
      </div>

     

     {/* Top Rated PGs Section */}
      <div className="top-rated-section">
  <h2>🌟 Top Rated PGs</h2>
  <div className="carousel">
    <div className="pg-card">
      <img src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" alt="Green Nest PG" />
      <h4>Green Nest PG</h4>
      <p>📍 Mumbai</p>
      <p>⭐ 4.9</p>
    </div>
    <div className="pg-card">
      <img src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" alt="Urban Stay PG" />
      <h4>Urban Stay PG</h4>
      <p>📍 Bangalore</p>
      <p>⭐ 4.8</p>
    </div>
    <div className="pg-card">
      <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" alt="Blue Sky Hostel" />
      <h4>Blue Sky Hostel</h4>
      <p>📍 Pune</p>
      <p>⭐ 4.7</p>
    </div>
  </div>
</div>

{/* ✅ Testimonials Section */}
<div className="testimonials-section">
  <h2>🗣️ What Our Users Say</h2>
  <div className="testimonial-carousel">
    <div className="testimonial-card">
      <p>“PG Finder made my relocation so smooth. Found a perfect PG in minutes!”</p>
      <h4>– Priya Sharma, Mumbai</h4>
    </div>
    <div className="testimonial-card">
      <p>“Simple UI and great features. Loved the favorites feature!”</p>
      <h4>– Aman Verma, Bangalore</h4>
    </div>
    <div className="testimonial-card">
      <p>“Highly recommended for students and working professionals alike.”</p>
      <h4>– Sneha Patil, Pune</h4>
    </div>
  </div>
</div>
{/*About Section */}
<section className="about-section">
  <h2>About PG Finder</h2>
  <p>
    PG Finder is your trusted partner in finding the best paying guest accommodations
    across India. Whether you're a student, working professional, or someone relocating,
    we make your PG search effortless and reliable.
  </p>
  <p>
    Our platform offers smart filters, verified listings, and a personalized dashboard
    to help you discover, compare, and save the best options that fit your lifestyle and budget.
  </p>
</section>

    </div>
  );
}

export default Home;
