import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../customHook/useAuthContext";
import { FaEye, FaEyeSlash, FaGlobeAsia } from "react-icons/fa";

const Login = () => {
  const [fullInfo, setFullInfo] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { dispatch } = useAuthContext();
  const history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;
    setFullInfo({ ...fullInfo, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://indiaexplorer-production.up.railway.app/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullInfo),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Login failed. Please try again.");
      } else {
        localStorage.setItem("user", JSON.stringify(result.data));
        dispatch({ type: "LOGIN", payload: result.data });
        if (result.data?.user?.role === "admin") {
          history.push("/admin");
        } else {
          history.push("/");
        }
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
          <h2>Welcome Back</h2>
          <p>Sign in to continue exploring India's breathtaking destinations and manage your bookings.</p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["500+ Tours", "12K+ Travelers", "4.9★ Rating"].map(s => (
              <span key={s} style={{
                background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.4)",
                color: "var(--primary-light)", padding: "6px 16px", borderRadius: 50,
                fontSize: "0.8rem", fontWeight: 600
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-box">
          <h1>Sign In</h1>
          <p className="auth-sub">Enter your credentials to access your account</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
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
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            New to India Explorer?{" "}
            <Link to="/register" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
