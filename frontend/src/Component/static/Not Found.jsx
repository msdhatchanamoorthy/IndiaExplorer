import { Link } from "react-router-dom";
import { FaCompass, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="page-top" style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
            background: "var(--bg)"
        }}>
            <div className="animate-fade-up">
                <FaCompass size={80} color="var(--primary)" style={{ marginBottom: "2rem", opacity: 0.8 }} />
                <h1 className="display-1 fw-900 mb-2" style={{ color: "var(--secondary)", letterSpacing: "-2px" }}>404</h1>
                <h2 className="h3 fw-700 mb-4">Lost in the Wilderness?</h2>
                <p className="text-muted mb-5 mx-auto" style={{ maxWidth: "450px" }}>
                    Oops! The page you're looking for seems to have vanished like a desert mirage.
                    Let's get you back on the right trail.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                    <Link to="/" className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <FaArrowLeft size={12} /> Back to Civilization
                    </Link>
                    <Link to="/package" className="btn-outline-gold">
                        Explore Packages
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
