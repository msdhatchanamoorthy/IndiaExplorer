import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaArrowRight } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

/* Premium horizontal scroll card list */
function Swipper({ data }) {
  if (!data || data.length === 0) return null;
  return (
    <div className="cards-scroll-wrap">
      <div className="cards-scroll">
        {data.map(item => (
          <PackageCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}

const PackageCard = ({ _id, name, location, pricePerAdult, rating, to_do_type, image }) => {
  const filled = Math.round(rating || 0);
  return (
    <Link className="pkg-card" to={`/package/${_id}`}>
      <div className="pkg-card-img-wrap">
        <img
          src={image?.[0]}
          alt={name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {to_do_type && <span className="pkg-card-badge">{to_do_type}</span>}
        <button className="pkg-card-fav" onClick={e => e.preventDefault()} aria-label="Save">♡</button>
      </div>
      <div className="pkg-card-body">
        <div className="pkg-card-location">
          <MdLocationOn style={{ color: "var(--primary)" }} />
          India / {location}
        </div>
        <div className="pkg-card-title">{name}</div>
        <div className="pkg-card-stars">
          {[1, 2, 3, 4, 5].map(i =>
            i <= filled
              ? <FaStar key={i} className="star-filled" />
              : <FaRegStar key={i} className="star-empty" />
          )}
        </div>
        <div className="pkg-card-footer">
          <div className="pkg-card-price">
            From <strong>₹{pricePerAdult?.toLocaleString()}</strong>
          </div>
          <span className="pkg-card-link">
            View <FaArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Swipper;
