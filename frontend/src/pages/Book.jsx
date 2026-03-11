import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaMapMarkerAlt, FaWhatsapp, FaPhoneAlt, FaSuitcase } from "react-icons/fa";
import { useAuthContext } from "../customHook/useAuthContext.js";
import useFetch from "../customHook/useFetch.js";

function Book() {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
    whatsapp: "",
    destination: "",
    travelDate: "",
    numPeople: 1,
    vacationType: "",
    captchaInput: ""
  });

  const [captcha, setCaptcha] = useState({ a: 0, b: 0, result: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");

  const { data: pkg, loading: pkgLoading } = useFetch(
    `/api/package/${id}`
  );

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
    }
    if (pkg) {
      setFormData(prev => ({ ...prev, destination: pkg.name }));
    }
    // Generate simple math captcha
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, result: a + b });
  }, [user, pkg]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData.captchaInput) !== captcha.result) {
      return setError("Incorrect Captcha. Please solve the math correctly.");
    }

    setSubmitting(true);
    setError("");

    if (!id) {
      return setError("Package ID is missing. Please select a package again.");
    }

    const body = {
      package: id, // Changed from packageId to package to match schema
      name: formData.name,
      cityOfResidence: formData.city,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      numberOfPeople: parseInt(formData.numPeople) || 1,
      price: pkg?.pricePerAdult || 0, // Sending base price from package
      depDate: formData.travelDate,
      vacationType: formData.vacationType,
      guestNotes: `Inquiry from ${formData.name}`,
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        setBooked(true);
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="page-top" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
        <div className="text-center p-5 shadow-lg bg-white rounded-4" style={{ maxWidth: "450px" }}>
          <FaSuitcase size={50} color="#e8a020" className="mb-4" />
          <h2 className="mb-3 fw-800">Login Required</h2>
          <p className="text-muted mb-4">You need to be logged in to send a booking inquiry. Join us today!</p>
          <Link to="/login" className="btn-gold w-100 py-3 rounded-pill text-decoration-none d-inline-block">
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (booked) {
    return (
      <div className="page-top" style={{ background: "#f8f9fa", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="container text-center animate-fade-up">
          <div style={{ width: 100, height: 100, background: "#10b981", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "2.5rem" }}>
            <FaCheckCircle />
          </div>
          <h1 className="display-5 fw-800 mb-3">Inquiry Sent Successfully!</h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Thank you, <strong>{formData.name}</strong>! We have received your travel request for <strong>{formData.destination}</strong>.
            Our travel expert will contact you shortly on <strong>{formData.phone}</strong>.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/" className="btn-gold py-3 px-5 rounded-pill shadow">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-top" style={{ background: "#fff", minHeight: "100vh", paddingBottom: "5rem" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="inquiry-form-card shadow-lg p-5 border-0 rounded-4" style={{ borderTop: "6px solid #ffcc00" }}>
              <div className="text-center mb-5">
                <h1 className="fw-800 display-6 mb-2">Tour Booking Form</h1>
                <p className="text-muted">Tell us about your travel plans and we'll handle the rest.</p>
              </div>

              {error && <div className="alert alert-danger mb-4 rounded-3 py-3 shadow-sm">{error}</div>}

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                <div className="form-group mb-2">
                  <label className="fw-700 mb-1 small">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control-custom"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="fw-700 mb-1 small">City of Residence *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control-custom"
                    placeholder="E.g. Madurai, Chennai"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="fw-700 mb-1 small">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control-custom"
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label className="fw-700 mb-1 small">Phone Number *</label>
                      <div className="position-relative">
                        <span className="input-icon-left"><FaPhoneAlt size={14} className="text-muted" /></span>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control-custom ps-5"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label className="fw-700 mb-1 small">WhatsApp Number</label>
                      <div className="position-relative">
                        <span className="input-icon-left"><FaWhatsapp size={16} style={{ color: "#25D366" }} /></span>
                        <input
                          type="tel"
                          name="whatsapp"
                          className="form-control-custom ps-5"
                          placeholder="WhatsApp (Optional)"
                          value={formData.whatsapp}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-2">
                  <label className="fw-700 mb-1 small">Selected Destination *</label>
                  <div className="position-relative">
                    <span className="input-icon-left"><FaMapMarkerAlt className="text-muted" /></span>
                    <input
                      type="text"
                      name="destination"
                      className="form-control-custom ps-5 bg-light"
                      placeholder="Destination"
                      value={formData.destination}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label className="fw-700 mb-1 small">Date of Travel *</label>
                      <input
                        type="date"
                        name="travelDate"
                        className="form-control-custom"
                        value={formData.travelDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label className="fw-700 mb-1 small">Number of People *</label>
                      <input
                        type="number"
                        name="numPeople"
                        min="1"
                        className="form-control-custom"
                        placeholder="Number of travelers"
                        value={formData.numPeople}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-2">
                  <label className="fw-700 mb-1 small">Vacation Type *</label>
                  <select
                    name="vacationType"
                    className="form-select-custom"
                    value={formData.vacationType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Vacation Type</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Family">Family Trip</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Friends">Friends Trip</option>
                    <option value="Personal">Personal/Solo</option>
                  </select>
                </div>

                <div className="captcha-section mt-4 pt-4 border-top">
                  <p className="fw-700 mb-3">Solve the Captcha to Submit <span className="text-danger">*</span></p>
                  <div className="d-flex align-items-center gap-3">
                    <div className="captcha-box px-4 py-3 bg-light rounded-3 fs-4 fw-800 border" style={{ minWidth: "120px", textAlign: "center" }}>
                      {captcha.a} + {captcha.b} =
                    </div>
                    <input
                      type="number"
                      name="captchaInput"
                      className="form-control-custom"
                      style={{ width: "100px" }}
                      placeholder="?"
                      value={formData.captchaInput}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-submit-yellow mt-4 py-3 shadow"
                  disabled={submitting}
                >
                  {submitting ? "SENDING INQUIRY..." : "SUBMIT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-control-custom, .form-select-custom {
          width: 100%;
          padding: 15px 20px;
          border: 1.5px solid #ececec;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s;
          background: #fdfdfd;
        }

        .form-control-custom:focus {
          outline: none;
          border-color: #ffcc00;
          background: #fff;
          box-shadow: 0 5px 15px rgba(255, 204, 0, 0.1);
        }

        .input-icon-left {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }

        .btn-submit-yellow {
          background: #ffcc00;
          color: #000;
          border: none;
          font-size: 1.2rem;
          font-weight: 800;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-submit-yellow:hover {
          background: #f0c000;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 204, 0, 0.3);
        }

        .btn-submit-yellow:active {
          transform: translateY(-1px);
        }

        .btn-submit-yellow:disabled {
          background: #e0e0e0;
          color: #888;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .inquiry-form-card {
           background: #fff;
        }

        .captcha-box {
          font-family: 'Courier New', Courier, monospace;
          background: #f8f9fa;
          border: 1px dashed #ccc;
          color: #2c3e50;
        }
      `}</style>
    </div>
  );
}

export default Book;

