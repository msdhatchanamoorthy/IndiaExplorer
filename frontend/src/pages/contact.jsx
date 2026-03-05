import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaAt, FaInstagram, FaTwitter, FaYoutube, FaHeadset } from "react-icons/fa";

function Contact() {
    const [fullInfo, setFullInfo] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    const contactDetails = {
        name: "DHATCHANAMOORTHY M S",
        email: "msdhatchanamoorthy001@gmail.com",
        phone: "+91 9345813730",
        location: "Salem, Tamil Nadu, India"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFullInfo({ ...fullInfo, [name]: value });
    }

    const handleSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            const response = await fetch("http://localhost:4000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fullInfo),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', msg: 'Thank you for reaching out! Our team will contact you shortly.' });
                setFullInfo({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', msg: result.message || 'Failed to send message.' });
            }
        } catch (err) {
            setStatus({ type: 'error', msg: 'Failed to send message. Please check your connection.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page-top" style={{ background: "var(--bg)", minHeight: "100vh" }}>
            {/* Header Section */}
            <section style={{
                height: "45vh",
                position: "relative",
                background: "url('https://images.unsplash.com/photo-1524492707947-5c8e1a742f36?w=1920&q=80') center/cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff"
            }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(10, 20, 50, 0.65)" }} />
                <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                    <div className="hero-badge animate-fade-up">Contact Us</div>
                    <h1 className="display-3 fw-900 mb-3 animate-fade-up-delay-1">Let's Plan Your Journey</h1>
                    <p className="lead animate-fade-up-delay-2 opacity-75">Connect with our India travel experts to curate your personalized experience.</p>
                </div>
            </section>

            <section className="container py-5 mt-n5" style={{ position: "relative", zIndex: 10 }}>
                <div className="row g-5">
                    {/* Contact Form */}
                    <div className="col-12 col-lg-7 animate-fade-up">
                        <div style={{ background: "#fff", padding: "3.5rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)" }}>
                            <h2 className="mb-4 fw-800" style={{ color: "var(--secondary)" }}>Send a Message</h2>

                            {status.msg && (
                                <div className={`p-3 rounded mb-4 animate-fade-up ${status.type === 'success' ? 'bg-success-light text-success' : 'auth-error'}`}
                                    style={status.type === 'success' ? { background: "#ecfdf5", border: "1px solid #10b981", color: "#065f46" } : {}}>
                                    {status.msg}
                                </div>
                            )}

                            <form onSubmit={handleSend}>
                                <div className="row">
                                    <div className="col-md-6 form-group mb-4">
                                        <label htmlFor="name" className="small fw-700 text-uppercase mb-2">Your Name</label>
                                        <input className="form-input" type="text" id="name" name='name' value={fullInfo.name} onChange={handleChange} placeholder='e.g. Rahul Sharma' required />
                                    </div>
                                    <div className="col-md-6 form-group mb-4">
                                        <label htmlFor="email" className="small fw-700 text-uppercase mb-2">Email Address</label>
                                        <input className="form-input" type="email" id="email" name='email' value={fullInfo.email} onChange={handleChange} placeholder='rahul@example.com' required />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="subject" className="small fw-700 text-uppercase mb-2">Subject</label>
                                    <input className="form-input" type="text" id="subject" name='subject' value={fullInfo.subject} onChange={handleChange} placeholder='How can we help?' required />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="message" className="small fw-700 text-uppercase mb-2">Detailed Message</label>
                                    <textarea className="form-input" id="message" name="message" value={fullInfo.message} onChange={handleChange} placeholder='Tell us about your dream trip to India...' style={{ height: 160, resize: "none" }} required></textarea>
                                </div>
                                <button className='btn-gold w-100' style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontSize: "1rem" }} type='submit' disabled={loading}>
                                    {loading ? 'Sending...' : <>Send Message <FaPaperPlane /></>}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information Sidebar */}
                    <div className="col-12 col-lg-5 animate-fade-up-delay-1">
                        <div className="h-100" style={{ background: "var(--secondary)", padding: "3.5rem", borderRadius: "var(--radius)", color: "#fff", boxShadow: "var(--shadow-md)" }}>
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <FaHeadset size={30} className="text-primary" />
                                <h2 className="mb-0 fw-800 h3">Direct Support</h2>
                            </div>
                            <p className="mb-5 opacity-75">Connect with our founder, {contactDetails.name}, to discuss custom group tours and special requirements.</p>

                            <div className="d-flex flex-column gap-5">
                                <div className="d-flex align-items-start gap-4">
                                    <div style={{ padding: "14px", background: "rgba(232,160,32,0.1)", borderRadius: "var(--radius-sm)", color: "var(--primary)", border: "1px solid rgba(232,160,32,0.2)" }}>
                                        <FaPhoneAlt size={22} />
                                    </div>
                                    <div>
                                        <h4 className="h6 fw-700 mb-1 text-primary text-uppercase">Direct Line</h4>
                                        <p className="h5 fw-600 mb-0">{contactDetails.phone}</p>
                                        <p className="small opacity-50">Mon - Sat, 9am - 8pm IST</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start gap-4">
                                    <div style={{ padding: "14px", background: "rgba(232,160,32,0.1)", borderRadius: "var(--radius-sm)", color: "var(--primary)", border: "1px solid rgba(232,160,32,0.2)" }}>
                                        <FaEnvelope size={22} />
                                    </div>
                                    <div>
                                        <h4 className="h6 fw-700 mb-1 text-primary text-uppercase">Email Support</h4>
                                        <p className="h5 fw-600 mb-0" style={{ fontSize: "1.1rem" }}>{contactDetails.email}</p>
                                        <p className="small opacity-50">Response within 4 hours</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start gap-4">
                                    <div style={{ padding: "14px", background: "rgba(232,160,32,0.1)", borderRadius: "var(--radius-sm)", color: "var(--primary)", border: "1px solid rgba(232,160,32,0.2)" }}>
                                        <FaMapMarkerAlt size={22} />
                                    </div>
                                    <div>
                                        <h4 className="h6 fw-700 mb-1 text-primary text-uppercase">Headquarters</h4>
                                        <p className="h5 fw-600 mb-0">{contactDetails.location}</p>
                                        <p className="small opacity-50">Tamil Nadu, India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 pt-5 border-top border-light border-opacity-10">
                                <h4 className="h6 fw-700 mb-4 text-uppercase letter-spacing-1 text-white-50">Social Presence</h4>
                                <div className="footer-social d-flex gap-3">
                                    <a href="https://x.com/Dhatchana_dev" target="_blank" rel="noopener noreferrer" style={{ width: 48, height: 48, background: "rgba(255,255,255,0.05)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }} aria-label="X (Twitter)"><FaTwitter /></a>
                                    <a href="https://www.threads.com/@dhatchana.dev" target="_blank" rel="noopener noreferrer" style={{ width: 48, height: 48, background: "rgba(255,255,255,0.05)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }} aria-label="Threads"><FaAt /></a>
                                    <a href="https://www.instagram.com/dhatchana.dev?igsh=MTJzeXIybGFtMWF0OA==" target="_blank" rel="noopener noreferrer" style={{ width: 48, height: 48, background: "rgba(255,255,255,0.05)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }} aria-label="Instagram"><FaInstagram /></a>
                                    <a href="https://www.youtube.com/@Dhatchana_dev" target="_blank" rel="noopener noreferrer" style={{ width: 48, height: 48, background: "rgba(255,255,255,0.05)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }} aria-label="Youtube"><FaYoutube /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map */}
            <section className="container py-5">
                <div style={{ height: "450px", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "var(--shadow-lg)", border: "8px solid #fff" }}>
                    <iframe
                        title="Incredible India Explorer Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125010.123456789!2d78.1000!3d11.6643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf0380c576cf3%3A0x6d90a883726f1a8e!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </div>
    );
}

export default Contact;