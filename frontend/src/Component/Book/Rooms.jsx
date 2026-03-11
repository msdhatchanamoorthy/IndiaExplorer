import React, { useContext, useEffect, useState } from "react";
import { context } from "../../context/context";
import { FaTimes, FaBed, FaDollarSign, FaHashtag, FaInfoCircle } from "react-icons/fa";
import { useAuthContext } from "../../customHook/useAuthContext";

function Rooms({ id, image, name, isRoom, setIsRoom, description }) {
  const { book, setBook, setRoomSelect } = useContext(context);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/hotel/${id}/room?taken=true`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const result = await res.json();
      setRooms(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Fetch rooms error:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectRoom = (room) => {
    setBook({
      ...book,
      hotelId: id,
      hotelName: name,
      roomId: room._id,
      roomImg: room.images[0],
      roomPrice: room.price,
      roomBody: room.description,
      roomType: room.type
    });
    setRoomSelect(true);
    setIsRoom(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-container animate-fade-up" style={{ maxWidth: "1000px" }}>
        <button className="modal-close" onClick={() => setIsRoom(false)}>
          <FaTimes />
        </button>

        <div className="modal-header-luxury">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-4">
              <img
                src={image}
                alt={name}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>
            <div className="col-12 col-md-8">
              <div className="text-primary fw-600 mb-1 small text-uppercase letter-spacing-1">Room Selection</div>
              <h2 className="display-6 fw-800 mb-2">{name}</h2>
              <p className="text-muted mb-0">{description}</p>
            </div>
          </div>
        </div>

        <div className="modal-body p-4">
          <h4 className="fw-700 mb-4 px-2">Available Room Types</h4>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner mx-auto" style={{ width: 40, height: 40 }} />
              <p className="mt-3 text-muted">Searching for available rooms...</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-5">
              <FaInfoCircle size={40} color="#e5e7eb" className="mb-3" />
              <h5 className="text-muted">No rooms currently available at this hotel.</h5>
            </div>
          ) : (
            <div className="row g-4">
              {rooms.map((room) => {
                const isCurrentSelected = book.roomId === room._id;
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={room._id}>
                    <div
                      className={`room-select-card ${isCurrentSelected ? 'selected' : ''}`}
                      onClick={() => selectRoom(room)}
                    >
                      <div className="room-card-img">
                        <img src={room.images[0]} alt={`Room ${room.roomNumber}`} />
                        <div className="room-card-price">₹{room.price?.toLocaleString()}</div>
                      </div>
                      <div className="room-card-content">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="room-type-badge">{room.type}</span>
                          <span className="room-number"><FaHashtag size={10} /> {room.roomNumber}</span>
                        </div>
                        <p className="small text-muted mb-0" style={{ fontSize: "0.8rem" }}>{room.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;

