import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaCheck, FaArrowRight, FaLuggageCart, FaMapMarkerAlt } from "react-icons/fa";
import { CartContext } from "../context/cartContex";
import { useAuthContext } from "../customHook/useAuthContext";

function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const { user } = useAuthContext();

  const removeFromCart = async (item) => {
    // Optimistic UI update
    dispatch({ type: "REMOVE", item });

    try {
      await fetch(`https://indiaexplorer.onrender.com/api/wishlist/${item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (err) {
      console.error("Failed to remove item from wishlist:", err);
    }
  };

  const total = state.reduce((acc, item) => acc + item.price, 0);

  if (state.length === 0) {
    return (
      <div className="page-top" style={{ background: "var(--bg)", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-center animate-fade-up">
          <div style={{ fontSize: "5rem", color: "var(--primary)", opacity: 0.2, marginBottom: "1.5rem" }}>
            <FaLuggageCart />
          </div>
          <h2 className="mb-3">Your Wishlist is Empty</h2>
          <p className="text-muted mb-4">You haven't added any adventure to your wishlist yet.</p>
          <Link to="/package" className="btn-gold">
            Explore Packages <FaArrowRight style={{ marginLeft: 8 }} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="page-top" style={{ background: "var(--bg)", minHeight: "90vh" }}>
      <div className="container py-5">
        <div className="section-header text-start mb-5">
          <h1 className="section-title">Your Wishlist</h1>
          <p>You have {state.length} {state.length === 1 ? 'adventure' : 'adventures'} saved for later.</p>
        </div>

        <div className="row g-4 align-items-start">
          {/* Wishlist Items */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-3">
              {state.map((item) => (
                <div
                  className="pkg-list-card animate-fade-up"
                  key={item._id}
                  style={{ gridTemplateColumns: "180px 1fr" }}
                >
                  <div className="pkg-list-card-img" style={{ height: "160px" }}>
                    <img src={item.photo} alt={item.name} />
                  </div>
                  <div className="pkg-list-card-body" style={{ padding: "1.2rem" }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{item.name}</h3>
                        <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600, marginBottom: "0.8rem" }}>
                          ₹{item.price?.toLocaleString()}
                        </div>
                      </div>
                      <button
                        className="btn-outline-gold"
                        style={{ padding: "8px", borderRadius: "50%", minWidth: "36px", height: "36px", color: "#6b7280", borderColor: "#e5e7eb" }}
                        onClick={() => removeFromCart(item)}
                        title="Remove from wishlist"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>

                    <div className="d-flex justify-content-end gap-3 mt-auto">
                      <Link
                        className="btn-outline-gold"
                        to={`/package/${item.packages}`}
                        style={{ padding: "8px 16px", fontSize: "0.8rem" }}
                      >
                        Details
                      </Link>
                      <Link
                        className="btn-gold"
                        to={`/book/${item.packages}`}
                        style={{ padding: "8px 20px", fontSize: "0.8rem" }}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-lg-4">
            <div className="filter-panel animate-fade-up" style={{ top: "100px", background: "var(--secondary)" }}>
              <h3 style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
                Order Summary
              </h3>

              <div className="mt-4 d-flex flex-column gap-3">
                <div className="d-flex justify-content-between text-light">
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>Items</span>
                  <span>{state.length}</span>
                </div>
                <div className="d-flex justify-content-between text-light">
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>Subtotal</span>
                  <span>₹{total?.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between text-light" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", marginTop: "0.5rem" }}>
                  <span style={{ fontWeight: 600 }}>Total Estimated</span>
                  <span style={{ color: "var(--primary)", fontWeight: 800, fontSize: "1.2rem" }}>
                    ₹{total?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded" style={{ background: "rgba(255,255,255,0.05)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                Prices are estimated based on package base price. Actual price may vary depending on travelers count and selected options during checkout.
              </div>

              <button
                className="btn-gold w-100 mt-4"
                style={{ padding: "14px", justifyContent: "center", display: "flex" }}
                onClick={() => {
                  if (state.length > 0) {
                    // Redirect to the first item for checkout or handle differently
                    window.location.href = `/book/${state[0].packages}`;
                  }
                }}
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;

