import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaGlobeAsia, FaHistory, FaAward, FaUsers, FaArrowRight } from "react-icons/fa";

const About = () => {
  const stats = [
    { icon: <FaGlobeAsia />, count: "28", label: "States Covered" },
    { icon: <FaUsers />, count: "25,000+", label: "Happy Explorers" },
    { icon: <FaAward />, count: "12+", label: "Years Excellence" },
    { icon: <FaHistory />, count: "100+", label: "Heritage Sites" },
  ];

  return (
    <div className="page-top" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero Content Section */}
      <section style={{
        background: "linear-gradient(135deg, var(--secondary) 0%, #0d1b3e 100%)",
        padding: "6rem 0",
        color: "#fff",
        textAlign: "center"
      }}>
        <div className="container">
          <h1 className="display-4 fw-800 mb-3 animate-fade-up">About Incredible India Explorer</h1>
          <p className="lead mx-auto animate-fade-up-delay-1" style={{ maxWidth: "800px", color: "rgba(255,255,255,0.73)" }}>
            We're on a mission to showcase the untold stories and hidden gems of Bharat.
            Join us in discovering a land that's more than a destination — it's an experience of a lifetime.
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6 animate-fade-up">
              <h2 className="section-title mb-4">Our Incredible Journey</h2>
              <p className="mb-4">
                Incredible India Explorer was founded with a single vision: to bridge the gap between
                global travelers and the authentic, soulful experiences that India has to offer.
                Whether it's a silent meditation in Rishikesh or a vibrant festival in Kolkata,
                we ensure you don't just visit — you belong.
              </p>
              <p className="mb-4">
                Based in Salem, Tamil Nadu, we understand the pulse of Indian hospitality (Atithi Devo Bhava).
                Our team of local experts meticulously curates every itinerary to ensure safety,
                comfort, and a deep connection with our culture.
              </p>
              <div className="d-flex flex-column gap-3 mb-5">
                <div className="d-flex align-items-center gap-3">
                  <FaCheckCircle color="var(--primary)" />
                  <span>Handpicked premium accommodations across the subcontinent</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <FaCheckCircle color="var(--primary)" />
                  <span>Certified multi-lingual guides with historical expertise</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <FaCheckCircle color="var(--primary)" />
                  <span>24/7 on-ground support for a worry-free journey</span>
                </div>
              </div>
              <Link to="/package" className="btn-gold">Explore Indian Packages <FaArrowRight /></Link>
            </div>
            <div className="col-12 col-lg-6 animate-fade-up-delay-1">
              <div style={{ position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1548013146-72479768b921?w=800&q=80"
                  alt="Taj Mahal"
                  className="img-fluid"
                  style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow-lg)" }}
                />
                <div style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "-20px",
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "1.5rem 2.5rem",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "var(--shadow-md)"
                }} className="d-none d-md-block">
                  <h3 className="h1 fw-800 mb-0">12+</h3>
                  <p className="mb-0 small fw-600 text-uppercase">Years of Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="row g-4 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="col-6 col-md-3 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: "2.5rem", color: "var(--primary)", marginBottom: "0.5rem", opacity: 0.8 }}>
                  {stat.icon}
                </div>
                <h3 className="h2 fw-800 mb-0" style={{ color: "var(--secondary)" }}>{stat.count}</h3>
                <p className="text-muted fw-600 mb-0">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title center">Why Explorer with Us?</h2>
            <p>We handle the chaos, you enjoy the magic.</p>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-12 col-md-4">
              <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", height: "100%" }} className="hover-shadow transition">
                <h4 className="fw-700 mb-3" style={{ color: "var(--secondary)" }}>Hyper-Local Expertise</h4>
                <p className="small text-muted mb-0">Our itineraries are designed by locals who know the fastest routes, the best street food, and the quietest scenic spots.</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", height: "100%" }} className="hover-shadow transition">
                <h4 className="fw-700 mb-3" style={{ color: "var(--secondary)" }}>Sustainability First</h4>
                <p className="small text-muted mb-0">We partner with local artisans and community-led stays to ensure that your travel positively impacts the destination.</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", height: "100%" }} className="hover-shadow transition">
                <h4 className="fw-700 mb-3" style={{ color: "var(--secondary)" }}>Seamless Logistics</h4>
                <p className="small text-muted mb-0">From premium SUVs for mountain terrains to internal flight bookings, we manage every detail of your transport.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ background: "url('https://images.unsplash.com/photo-1510674485131-dc88d96369b4?w=1920&q=80') center/cover fixed", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10, 20, 50, 0.82)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", color: "#fff" }}>
          <h2 className="display-4 fw-800 mb-4">Your Incredible Story Starts Here</h2>
          <p className="lead mb-5 opacity-75">Join our community of over 25,000 travelers and experience the soul of India.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/register" className="btn-gold">Join the Community</Link>
            <Link to="/contact" className="btn-outline-gold" style={{ borderColor: "#fff", color: "#fff" }}>Talk to an Expert</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
