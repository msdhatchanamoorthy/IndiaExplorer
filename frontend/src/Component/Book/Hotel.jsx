import React, { useContext, useState } from "react";
import { context } from "../../context/context";
import { FaBed, FaCheckCircle } from "react-icons/fa";
import Rooms from "./Rooms";

function Hotel({ _id, name, image, description }) {
  const { book } = useContext(context);
  const [isRoom, setIsRoom] = useState(false);
  const isSelected = book.hotelId === _id;

  return (
    <div className={`hotel-card-select ${isSelected ? 'selected' : ''}`}>
      <div className="hotel-card-img">
        <img src={image} alt={name} loading="lazy" />
        {isSelected && (
          <div className="hotel-card-selected-badge">
            <FaCheckCircle /> Selected
          </div>
        )}
      </div>
      <div className="hotel-card-body">
        <h3 className="h5 fw-700 mb-2">{name}</h3>
        <p className="small text-muted mb-3" style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {description}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <button
            type="button"
            className="btn-outline-gold"
            style={{ padding: "8px 16px", fontSize: "0.8rem", width: "100%", justifyContent: "center" }}
            onClick={() => setIsRoom(true)}
          >
            <FaBed style={{ marginRight: 8 }} /> {book.hotelId === _id ? 'Change Room' : 'Select Room'}
          </button>
        </div>
      </div>

      {isRoom && (
        <Rooms
          id={_id}
          name={name}
          image={image}
          description={description}
          isRoom={isRoom}
          setIsRoom={setIsRoom}
          key={_id}
        />
      )}
    </div>
  );
}

export default Hotel;
