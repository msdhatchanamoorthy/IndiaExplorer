import { FaCoffee, FaMountain, FaHistory, FaHiking, FaImages, FaGlobeAsia, FaMusic, FaPlaceOfWorship } from "react-icons/fa";
import { MdCameraAlt } from "react-icons/md";

const India = () => {
    const experiences = [
        { title: "Spiritual", img: "https://images.unsplash.com/photo-1544735230-c12844578af3?w=600&q=80", icon: <FaPlaceOfWorship /> },
        { title: "Coastal", img: "https://images.unsplash.com/photo-1512480133894-374668600f91?w=600&q=80", icon: <FaMountain /> },
        { title: "Royal", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80", icon: <FaHistory /> },
    ];

    return (
        <div className="page-top" style={{ background: "var(--bg)", minHeight: "100vh" }}>
            {/* Hero Header */}
            <section className="hero" style={{ height: "65vh", minHeight: "450px" }}>
                <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768b921?w=1920&q=80')" }} />
                <div className="hero-overlay" />
                <div className="hero-content">
                    <div className="hero-badge animate-fade-up">Explore the Subcontinent</div>
                    <h1 className="hero-title animate-fade-up-delay-1">INCREDIBLE INDIA</h1>
                    <p className="hero-subtitle animate-fade-up-delay-2">A land of ancient wisdom, diverse cultures, and breathtaking beauty.</p>
                </div>
            </section>

            {/* Intro Narrative */}
            <section className="section">
                <div className="container">
                    <div className="row g-5 align-items-start">
                        <div className="col-12 col-lg-7 animate-fade-up">
                            <h2 className="section-title mb-4">The Land of Diversity</h2>
                            <p className="lead fw-600 mb-4" style={{ color: "var(--secondary)" }}>
                                India is not just a country; it's an experience that stays with you forever.
                                From the tropical backwaters of Kerala to the majestic Himalayan peaks.
                            </p>
                            <p className="mb-4">
                                As home to the world's oldest living civilizations, India offers a kaleidoscope
                                of traditions, languages, and religions. Visitors can marvel at the architectural
                                perfection of the Taj Mahal, explore the spiritual ghats of Varanasi, or get
                                lost in the vibrant colors of Rajasthan's street markets.
                            </p>
                            <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", borderLeft: "6px solid var(--primary)" }}>
                                <p className="mb-0 italic text-muted" style={{ fontSize: "1.1rem" }}>
                                    "India is the cradle of the human race, the birthplace of human speech,
                                    the mother of history, the grandmother of legend, and the great grandmother of tradition."
                                    — Mark Twain
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 animate-fade-up-delay-1">
                            <div style={{ background: "var(--secondary)", color: "#fff", padding: "3rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-lg)" }}>
                                <h3 className="h4 fw-800 mb-4 text-primary text-uppercase letter-spacing-1">India at a Glance</h3>
                                <ul className="list-unstyled d-flex flex-column gap-3">
                                    <li className="d-flex justify-content-between border-bottom pb-2 border-light border-opacity-10">
                                        <span className="opacity-60">Capital</span>
                                        <span className="fw-600">New Delhi</span>
                                    </li>
                                    <li className="d-flex justify-content-between border-bottom pb-2 border-light border-opacity-10">
                                        <span className="opacity-60">Largest City</span>
                                        <span className="fw-600">Mumbai</span>
                                    </li>
                                    <li className="d-flex justify-content-between border-bottom pb-2 border-light border-opacity-10">
                                        <span className="opacity-60">Languages</span>
                                        <span className="fw-600">Hindi, English + 21 Others</span>
                                    </li>
                                    <li className="d-flex justify-content-between border-bottom pb-2 border-light border-opacity-10">
                                        <span className="opacity-60">UNESCO Sites</span>
                                        <span className="fw-600">40 Sites</span>
                                    </li>
                                    <li className="d-flex justify-content-between">
                                        <span className="opacity-60">Time Zone</span>
                                        <span className="fw-600">GMT +5:30 (IST)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Sections */}
            <section className="section pt-0">
                <div className="container">
                    <div className="row g-4 text-start">
                        {/* Spirituality */}
                        <div className="col-12 col-md-4 animate-fade-up">
                            <div style={{ background: "#fff", padding: "3rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", height: "100%" }}>
                                <div style={{ color: "var(--primary)", fontSize: "2.5rem", marginBottom: "1.2rem" }}><FaPlaceOfWorship /></div>
                                <h4 className="fw-800 mb-3">Spirituality & Wellness</h4>
                                <p className="text-muted mb-0 small line-height-1-8">
                                    The birthplace of Yoga and Ayurveda. India offers a soul-searching journey
                                    from the meditation centers of Rishikesh to the ancient temples of South India.
                                </p>
                            </div>
                        </div>
                        {/* Heritage */}
                        <div className="col-12 col-md-4 animate-fade-up-delay-1">
                            <div style={{ background: "#fff", padding: "3rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", height: "100%" }}>
                                <div style={{ color: "var(--primary)", fontSize: "2.5rem", marginBottom: "1.2rem" }}><FaHistory /></div>
                                <h4 className="fw-800 mb-3">Royal Heritage</h4>
                                <p className="text-muted mb-0 small line-height-1-8">
                                    Step back in time through the grand palaces of Udaipur and the formidable
                                    forts of Delhi. Experience the life of the Maharajas in heritage stays.
                                </p>
                            </div>
                        </div>
                        {/* Culinary */}
                        <div className="col-12 col-md-4 animate-fade-up-delay-2">
                            <div style={{ background: "#fff", padding: "3rem", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", height: "100%" }}>
                                <div style={{ color: "var(--primary)", fontSize: "2.5rem", marginBottom: "1.2rem" }}><FaMusic /></div>
                                <h4 className="fw-800 mb-3">Vibrant Festivals</h4>
                                <p className="text-muted mb-0 small line-height-1-8">
                                    From the colorful Holi celebrations to the luminous Diwali lights.
                                    Experience India's festivals that perfectly capture the joy of life.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Grid */}
            <section className="section" style={{ background: "#fff" }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title center">Limitless Flavors</h2>
                        <p>Every 100km, the food, the dialect, and the landscape change in India.</p>
                    </div>

                    <div className="row g-4 mt-4">
                        {experiences.map((exp, i) => (
                            <div key={i} className="col-12 col-md-4 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className="explore-card">
                                    <img src={exp.img} alt={exp.title} />
                                    <div className="explore-card-overlay">
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>{exp.icon}</span>
                                            <div className="explore-card-title">{exp.title} Journeys</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing Statement */}
            <section className="section">
                <div className="container text-center">
                    <div style={{ maxWidth: "850px", margin: "0 auto" }} className="animate-fade-up">
                        <h2 className="mb-4 fw-900 display-5">A Warm Indian Welcome</h2>
                        <p className="lead text-muted mb-5">
                            Experience the true meaning of 'Atithi Devo Bhava' — where the guest
                            is treated as God. We invite you to discover the magic that makes India truly incredible.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 30, opacity: 0.3 }}>
                            <MdCameraAlt size={45} color="var(--primary)" />
                            <FaGlobeAsia size={45} color="var(--primary)" />
                            <FaImages size={45} color="var(--primary)" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default India;
