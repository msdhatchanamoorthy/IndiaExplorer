import React, { useEffect, useState } from "react";
import { FaStar, FaUserCircle, FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useAuthContext } from "../customHook/useAuthContext.js";

function Review({ unique }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://indiaexplorer-production.up.railway.app/api/package/${unique}/comment`);
      const result = await response.json();
      if (response.ok) {
        setReviews(result.data?.comments || result.data || []);
      }
    } catch (err) {
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [unique]);

  if (loading) return <div className="text-center py-4"><div className="spinner mx-auto" style={{ width: 30, height: 30 }} /></div>;

  if (reviews.length === 0) {
    return (
      <div className="text-center py-5" style={{ background: "#fff", borderRadius: "12px", border: "1px dashed #e2e8f0" }}>
        <p className="text-muted mb-0">No reviews yet for this package. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {reviews.map((review) => (
        <EachReview key={review._id} {...review} />
      ))}
    </div>
  );
}

const EachReview = ({ _id, user: userName, text, like, dislike, rating }) => {
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(user?.detail?.likedComment?.includes(_id) || false);
  const [disliked, setDisliked] = useState(user?.detail?.dislikedComment?.includes(_id) || false);
  const [likeCount, setLikeCount] = useState(like || 0);
  const [dislikeCount, setDislikeCount] = useState(dislike || 0);

  const handleVote = async (type) => {
    if (!user) return; // Must be logged in

    let newLike = likeCount;
    let newDislike = dislikeCount;

    if (type === 'like') {
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
        newLike = -1;
      } else {
        if (disliked) {
          setDisliked(false);
          setDislikeCount(dislikeCount - 1);
          newDislike = -1;
        }
        setLiked(true);
        setLikeCount(likeCount + 1);
        newLike = 1;
      }
    } else {
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
        newDislike = -1;
      } else {
        if (liked) {
          setLiked(false);
          setLikeCount(likeCount - 1);
          newLike = -1;
        }
        setDisliked(true);
        setDislikeCount(dislikeCount + 1);
        newDislike = 1;
      }
    }

    try {
      await fetch(`https://indiaexplorer-production.up.railway.app/api/comment/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ like: newLike, dislike: newDislike }),
      });
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  return (
    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", transition: "var(--transition)" }} className="hover-shadow">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-center gap-3">
          <div style={{ background: "var(--bg)", width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
            <FaUserCircle size={28} />
          </div>
          <div>
            <h5 className="h6 fw-700 mb-0">{userName}</h5>
            <div className="d-flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={12} color={i < (rating || 5) ? "var(--primary)" : "#e2e8f0"} />
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={() => handleVote('like')}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: liked ? "var(--primary)" : "var(--text-muted)", transition: "0.2s" }}
          >
            {liked ? <FaThumbsUp size={16} /> : <FaRegThumbsUp size={16} />}
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{likeCount}</span>
          </button>
          <button
            onClick={() => handleVote('dislike')}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: disliked ? "#ef4444" : "var(--text-muted)", transition: "0.2s" }}
          >
            {disliked ? <FaThumbsDown size={16} /> : <FaRegThumbsDown size={16} />}
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{dislikeCount}</span>
          </button>
        </div>
      </div>
      <p className="mb-0 text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
};

export default Review;
