import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaArrowRight, FaFilter, FaTimes } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import useFetch from "../customHook/useFetch";

const SkeletonListCard = () => (
  <div className="pkg-list-card" style={{ overflow: "hidden" }}>
    <div className="skeleton" style={{ height: 200 }} />
    <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="skeleton skeleton-line short" />
      <div className="skeleton skeleton-line medium" />
      <div className="skeleton skeleton-line" style={{ width: "40%" }} />
    </div>
  </div>
);

const Packages = () => {
  const [datas, setDatas] = useState([]);
  const [dropDown, setDropDown] = useState({ type: "any", price: "any", rate: "any" });
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const { data, loading } = useFetch(
    `https://indiaexplorer-production.up.railway.app/api/package?page=${page}`,
    page
  );

  useEffect(() => {
    if (data && page === 1) {
      setDatas([...data]);
    } else if (data) {
      setDatas(prev => [...prev, ...data]);
    }
  }, [data]);

  const handleChange = e => {
    setDropDown({ ...dropDown, [e.target.name]: e.target.value });
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  const Find = async () => {
    const type = dropDown.type !== "any" ? `type=${dropDown.type}` : "";
    const price = dropDown.price !== "any" ? `priceRange=${dropDown.price}` : "";
    const rate = dropDown.rate !== "any" ? `rating=${dropDown.rate}` : "";
    const query = [type, price, rate].filter(Boolean).join("&");

    const response = await fetch(`https://indiaexplorer-production.up.railway.app/api/package?${query}`);
    const result = await response.json();
    if (response.ok) setDatas(result.data?.packages || result.data || []);
    setFilterOpen(false);
  };

  const resetFilter = () => {
    setDropDown({ type: "any", price: "any", rate: "any" });
    setPage(1);
  };

  const StarRating = ({ rating }) => {
    const filled = Math.round(rating || 0);
    return (
      <div className="pkg-card-stars">
        {[1, 2, 3, 4, 5].map(i =>
          i <= filled
            ? <FaStar key={i} className="star-filled" />
            : <FaRegStar key={i} className="star-empty" />
        )}
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginLeft: 6 }}>
          ({rating?.toFixed(1) || "0.0"})
        </span>
      </div>
    );
  };

  const FilterPanel = () => (
    <div className="filter-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0 }}>Filter By</h3>
        <button
          onClick={resetFilter}
          style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)", padding: "6px 14px", borderRadius: 50,
            cursor: "pointer", fontSize: "0.8rem", fontFamily: "Poppins, sans-serif"
          }}
        >
          Reset
        </button>
      </div>

      <div className="filter-group">
        <label>Tour Type</label>
        <select className="filter-select" name="type" onChange={handleChange} value={dropDown.type}>
          <option value="any">Any Type</option>
          <option value="Group">Group</option>
          <option value="Park">Park</option>
          <option value="City">City</option>
          <option value="Adventure">Adventure</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <select className="filter-select" name="price" onChange={handleChange} value={dropDown.price}>
          <option value="any">Any Price</option>
          <option value="less5000">Under ₹5,000</option>
          <option value="5000-10000">₹5,000 – ₹10,000</option>
          <option value="10000-15000">₹10,000 – ₹15,000</option>
          <option value="morethan15000">Above ₹15,000</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Min Rating</label>
        <select className="filter-select" name="rate" onChange={handleChange} value={dropDown.rate}>
          <option value="any">Any Rating</option>
          <option value={5}>★★★★★ (5)</option>
          <option value={4}>★★★★☆ (4+)</option>
          <option value={3}>★★★☆☆ (3+)</option>
          <option value={2}>★★☆☆☆ (2+)</option>
        </select>
      </div>

      <button className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex" }} onClick={Find}>
        Apply Filters
      </button>
    </div>
  );

  return (
    <div className="page-top" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--secondary) 0%, #0d1b3e 100%)",
        padding: "4rem 0 3rem",
        textAlign: "center",
      }}>
        <div className="container">
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
            Explore Packages
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem" }}>
            Handpicked tours across India's most iconic destinations
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "3rem 1rem" }}>
        {/* Mobile Filter Toggle */}
        <button
          className="btn-outline-gold"
          style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <FaFilter size={13} />
          {filterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="row g-4">
          {/* Filter Sidebar */}
          <div className={`col-12 col-md-3 ${!filterOpen ? "d-none d-md-block" : ""}`}>
            <FilterPanel />
          </div>

          {/* Package List */}
          <div className="col-12 col-md-9">
            {loading && datas.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[1, 2, 3].map(i => <SkeletonListCard key={i} />)}
              </div>
            )}

            {!loading && datas.length === 0 && (
              <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                <h3>No packages found</h3>
                <p>Try adjusting your filters</p>
              </div>
            )}

            {datas.map(pkg => {
              const { _id, name, image, pricePerAdult, rating, location, to_do_type } = pkg;
              return (
                <div className="pkg-list-card" key={_id}>
                  <div className="pkg-list-card-img">
                    <img src={image?.[0]} alt={name} loading="lazy" />
                    {to_do_type && (
                      <span className="pkg-card-badge" style={{ position: "absolute", top: 12, left: 12 }}>
                        {to_do_type}
                      </span>
                    )}
                  </div>
                  <div className="pkg-list-card-body">
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 6 }}>
                        <MdLocationOn style={{ color: "var(--primary)" }} />
                        India / {location}
                      </div>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem" }}>{name}</h3>
                      <StarRating rating={rating} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>From</div>
                        <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)" }}>
                          {pricePerAdult?.toLocaleString()} <span style={{ fontSize: "0.8rem", fontWeight: 400 }}>INR</span>
                        </div>
                      </div>
                      <Link to={`/package/${_id}`} className="btn-gold" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
                        View Details <FaArrowRight style={{ marginLeft: 6 }} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {datas.length > 0 && (
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button className="btn-outline-gold" onClick={handleLoadMore}>
                  Load More Packages
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
