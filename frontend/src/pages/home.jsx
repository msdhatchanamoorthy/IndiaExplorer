import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaStar, FaShieldAlt, FaHistory, FaHiking, FaCompass } from "react-icons/fa";
import useFetch from "../customHook/useFetch";
import Swipper from "../Component/static/Swipper";
import InfoBanner from "../Component/static/banner";

const Home = () => {
  const [s_name, setName] = useState("");
  const { data: recentpkg, loading: loadingRecent } = useFetch(
    "https://indiaexplorer.onrender.com/api/package?limit=8&sort=-createdAt"
  );
  const { data: popularPkg, loading: loadingPopular } = useFetch(
    "https://indiaexplorer.onrender.com/api/package?limit=8&sort=-rating"
  );

  const cityList = recentpkg ? recentpkg.filter(city => city.name.toLowerCase().includes(s_name.toLowerCase())) : [];

  const exploreItems = [
    { title: "Kerala Backwaters", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80", desc: "Serene landscapes and peaceful houseboats." },
    { title: "Rajasthan Palaces", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80", desc: "Majestic forts and the royal history of India." },
    { title: "Himalayan Treks", img: "https://images.unsplash.com/photo-1544735230-c12844578af3?w=800&q=80", desc: "Breathtaking views and adventurous mountain trails." },
  ];

  return (
    <div className="home-wrapper">
      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524492707947-5c8e1a742f36?w=1920&q=80')" }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge animate-fade-up">Atithi Devo Bhava</div>
          <h1 className="hero-title animate-fade-up-delay-1">
            Experience <span>Incredible India</span>
          </h1>
          <p className="hero-subtitle animate-fade-up-delay-2">
            From the snow-capped Himalayas to the sun-kissed beaches of Goa,
            discover the magic of India's vibrant colors and ancient soul.
          </p>

          <div className="animate-fade-up-delay-3" style={{ position: "relative" }}>
            <div className="hero-search-box">
              <FaMapMarkerAlt style={{ color: "var(--primary)", marginRight: 10 }} />
              <input
                type="text"
                placeholder="Where in India do you want to explore?"
                value={s_name}
                onChange={e => setName(e.target.value)}
              />
              <button className="hero-search-btn">
                Search <FaArrowRight size={13} />
              </button>
            </div>
            {s_name && cityList.length > 0 && (
              <div className="hero-search-dropdown">
                {cityList.map((city, i) => (
                  <Link key={i} to={`/package/${city._id}`}>
                    <strong>{city.location}: </strong> {city.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="hero-stats animate-fade-up-delay-3">
            <div className="hero-stat">
              <span className="hero-stat-num">28</span>
              <span className="hero-stat-label">States</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">40+</span>
              <span className="hero-stat-label">UNESCO Sites</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">1.4B+</span>
              <span className="hero-stat-label">Stories</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Explore</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ── RECENT PACKAGES ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title center">Hot India Deals</h2>
            <p>Our most recently added curated tours across the subcontinent</p>
          </div>
          <Swipper data={recentpkg} loading={loadingRecent} />
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/package" className="btn-outline-gold">
              Browse All Destinations <FaArrowRight style={{ marginLeft: 8 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── INFO BANNER 1 ── */}
      <section className="section pt-0">
        <div className="container">
          <InfoBanner
            title="Magnificent Rajasthan"
            text="Dive into the land of kings. Experience the regal splendor of Jaipur, the blue magic of Jodhpur, and the golden sands of Jaisalmer with our premium heritage tours."
            buttonText="Explore Heritage"
            img="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=900&q=80"
          />
        </div>
      </section>

      {/* ── POPULAR PACKAGES ── */}
      <section className="section" style={{ background: "var(--secondary)", padding: "5rem 0" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title center" style={{ color: "#fff" }}>Bucket List Destinations</h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>The most loved experiences by our global explorers</p>
          </div>
          <Swipper data={popularPkg} loading={loadingPopular} />
        </div>
      </section>

      {/* ── INFO BANNER 2 ── */}
      <section className="section">
        <div className="container">
          <InfoBanner
            title="God's Own Country"
            text="Unwind in the tranquil backwaters of Kerala. From spice plantations in Munnar to the pristine beaches of Varkala, rejuvenate your soul in India's greenest corner."
            buttonText="Discover Kerala"
            img="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=80"
            reverse
          />
        </div>
      </section>

      {/* ── EXPLORE CARDS ── */}
      <section className="section pt-0">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title center">Diverse Experiences</h2>
            <p>India offers something for every type of traveler</p>
          </div>
          <div className="row g-4">
            {exploreItems.map((item, i) => (
              <div key={i} className="col-12 col-md-4">
                <div className="explore-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <img src={item.img} alt={item.title} />
                  <div className="explore-card-overlay">
                    <h3 className="explore-card-title">{item.title}</h3>
                    <p className="explore-card-desc">{item.desc}</p>
                    <Link to="/package" className="text-primary text-decoration-none small fw-600">Learn More <FaArrowRight size={10} /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

