import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { FaStar, FaArrowLeft, FaCheck } from "react-icons/fa";
import Review from "../Component/Review";
import { useAuthContext } from "../customHook/useAuthContext";
import useFetch from "../customHook/useFetch";

const ReviewsPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [numStar, setNumStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const rateStars = Array(5).fill(0);
  const { user } = useAuthContext();

  const { data: site, loading } = useFetch(
    `http://localhost:4000/api/package/${id}`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      setSuccess(true);
      setSuccessText("Please check the agreement box to continue.");
      return;
    }
    if (numStar === 0) {
      setSuccess(true);
      setSuccessText("Please select a rating.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:4000/api/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pkg: id,
          text: comment,
          rating: numStar,
        }),
      });

      const response1 = await fetch(`http://localhost:4000/api/package/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_rate: numStar,
        }),
      });

      if (response1.ok) {
        setSuccess(true);
        setSuccessText("Your review has been successfully posted!");
        setTimeout(() => {
          history.goBack();
        }, 2000);
      } else {
        const errorData = await response1.json();
        setSuccess(true);
        setSuccessText(errorData.message || "Failed to post review.");
      }
    } catch (err) {
      setSuccess(true);
      setSuccessText("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-top spinner-wrap">
        <div className="spinner" />
      </div>
    );
  }

  if (!site) {
    return (
      <div className="page-top text-center py-5">
        <h4>No package found for review</h4>
        <Link to="/package" className="btn-gold mt-3">Browse Packages</Link>
      </div>
    );
  }

  return (
    <section className="page-top" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="container py-5">
        {/* Back Button */}
        <button
          onClick={() => history.goBack()}
          className="btn-outline-gold mb-4"
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", fontSize: "0.85rem" }}
        >
          <FaArrowLeft size={12} /> Back
        </button>

        <div className="row g-5">
          {/* Left Side: Package Card */}
          <div className="col-12 col-md-5">
            <div className="pkg-card" style={{ height: "auto", cursor: "default" }}>
              <div className="pkg-card-img-wrap" style={{ height: "300px" }}>
                <img src={site.image[0]} alt={site.name} />
                <div className="pkg-card-badge">{site.location}</div>
              </div>
              <div className="pkg-card-body">
                <h1 className="pkg-card-title" style={{ fontSize: "1.8rem" }}>{site.name}</h1>
                <p className="mb-0">Share your experience and help other travelers discover the beauty of India.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Review Form */}
          <div className="col-12 col-md-7">
            <div className="auth-form-box" style={{ maxWidth: "100%", background: "#fff", padding: "2.5rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}>
              <h2 className="mb-2">Rate Your Experience</h2>
              <p className="text-muted mb-4">Your feedback is valuable to us and the community.</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-600 mb-2">OVERALL RATING</label>
                  <div className="d-flex gap-2">
                    {rateStars.map((_, index) => (
                      <FaStar
                        key={index}
                        size={32}
                        style={{ cursor: "pointer", transition: "var(--transition)" }}
                        color={numStar > index ? "var(--primary)" : "#e5e7eb"}
                        onClick={() => setNumStar(index + 1)}
                      />
                    ))}
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="reviewArea">WRITE YOUR REVIEW</label>
                  <textarea
                    className="form-input"
                    id="reviewArea"
                    rows="5"
                    placeholder="Tell us about the highlights of your trip, the service, and any tips for future travelers..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ resize: "none" }}
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="d-flex align-items-start gap-3" style={{ cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      style={{ marginTop: "6px", width: "18px", height: "18px" }}
                      checked={agree}
                      onChange={() => setAgree(!agree)}
                    />
                    <span className="text-muted" style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
                      I certify that this review is based on my own experience and is my genuine opinion,
                      and that I have no personal or business relationship with this establishment.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-gold w-100"
                  style={{ padding: "14px", fontSize: "1rem" }}
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                      Posting...
                    </span>
                  ) : "Post Review"}
                </button>

                {success && (
                  <div className={`mt-3 p-3 rounded text-center ${successText.includes("success") ? "bg-success-light text-success" : "auth-error"}`}
                    style={successText.includes("success") ? { background: "#ecfdf5", border: "1px solid #10b981", color: "#065f46" } : {}}>
                    {successText}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Recent Reviews Section */}
        <div className="mt-5 pt-5">
          <div className="section-header text-start mb-4">
            <h2 className="section-title">Recent Reviews</h2>
            <p>See what others are saying about {site.name}</p>
          </div>
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}>
            <Review unique={site._id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;
