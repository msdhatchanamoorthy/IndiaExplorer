import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../customHook/useAuthContext";
import { FaEye, FaEyeSlash, FaGlobeAsia } from "react-icons/fa";

const Register = () => {
  const history = useHistory();
  const { dispatch } = useAuthContext();
  const [fullInfo, setFullInfo] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFullInfo({ ...fullInfo, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://indiaexplorer.onrender.com/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullInfo),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Registration failed. Please try again.");
      } else {
        localStorage.setItem("user", JSON.stringify(result.data));
        dispatch({ type: "LOGIN", payload: result.data });
        history.push("/");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-content">
          <FaGlobeAsia style={{ fontSize: "3rem", color: "var(--primary)", marginBottom: "1.5rem" }} />
          <h2>Join India Explorer</h2>
          <p>Create your account and start exploring India's most breathtaking destinations today.</p>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.8rem", textAlign: "left" }}>
            {[
              "✓ Access 500+ curated tour packages",
              "✓ Book hotels and rooms instantly",
              "✓ Save favorites to your wishlist",
              "✓ Exclusive member discounts",
            ].map(s => (
              <span key={s} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-box">
          <h1>Create Account</h1>
          <p className="auth-sub">Fill in your details to get started</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="form-input"
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  onChange={handleChange}
                  required
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)"
                  }}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                Must be at least 8 characters with uppercase, number & symbol.
              </p>
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{ width: "100%", justifyContent: "center", display: "flex", marginTop: "1.5rem", padding: "14px" }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

