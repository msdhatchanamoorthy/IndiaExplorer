import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FaLuggageCart, FaBars, FaTimes, FaGlobeAsia } from "react-icons/fa";
import { CartContext } from "../../context/cartContex";
import { useAuthContext } from "../../customHook/useAuthContext";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { state, dispatch: dis2 } = useContext(CartContext);
  const { user, dispatch: dis1 } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect scroll to switch navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLogout = () => {
    dis1({ type: "LOGOUT" });
    localStorage.removeItem("user");
    history.push("/");
    dis2({ type: "SET", item: [] });
  };

  const isHome = pathname === "/";
  const navClass = [
    "navbar-custom",
    isHome && !scrolled ? "transparent" : "solid",
    mobileOpen ? "mobile-open" : "",
  ].filter(Boolean).join(" ");

  const isActive = (path) => pathname === path ? "active" : "";

  return (
    <nav className={navClass}>
      {/* Logo */}
      <Link to="/" className="nav-logo">
        <FaGlobeAsia style={{ color: "var(--primary)", fontSize: "1.8rem" }} />
        <span>India<span style={{ color: "#fff" }}>Explorer</span></span>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="nav-links">
        <li><Link to="/" className={isActive("/")}>Home</Link></li>
        <li><Link to="/package" className={isActive("/package")}>Packages</Link></li>
        <li><Link to="/India" className={isActive("/India")}>India</Link></li>
        <li><Link to="/about" className={isActive("/about")}>About</Link></li>
        <li><Link to="/contact" className={isActive("/contact")}>Contact</Link></li>
      </ul>

      {/* Desktop Actions */}
      <div className="nav-actions">
        {user ? (
          <>
            <button
              className="btn-outline-gold"
              style={{ padding: "8px 16px", fontSize: "0.85rem", cursor: "pointer" }}
              onClick={() => history.push("/cart")}
            >
              <FaLuggageCart style={{ marginRight: 6 }} />
              {state.length > 0 && (
                <span style={{
                  background: "var(--accent)", color: "#fff",
                  borderRadius: "50%", padding: "1px 6px",
                  fontSize: "0.7rem", marginLeft: 4
                }}>{state.length}</span>
              )}
              Wishlist
            </button>
            <button
              className="btn-gold"
              style={{ padding: "8px 20px", fontSize: "0.85rem", cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn-login">Login</Link>
            <Link to="/register" className="btn-gold" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
        {mobileOpen ? <FaTimes color="white" size={20} /> : <FaBars color="white" size={20} />}
      </button>
    </nav>
  );
};

export default Header;
