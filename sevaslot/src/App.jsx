import { useState } from "react";
import "./App.css";

const services = [
  {
    name: "Income Certificate",
    icon: "💰",
    color: "purple",
    docs: ["Aadhaar Card", "Address Proof", "Income Proof", "Passport Photo"],
  },
  {
    name: "Caste Certificate",
    icon: "📄",
    color: "blue",
    docs: ["Aadhaar Card", "Address Proof", "Caste Proof", "Passport Photo"],
  },
  {
    name: "Residence Certificate",
    icon: "🏠",
    color: "green",
    docs: ["Aadhaar Card", "Address Proof", "Residence Proof"],
  },
  {
    name: "Birth Certificate",
    icon: "👶",
    color: "orange",
    docs: ["Hospital Record", "Parent ID", "Address Proof"],
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [token, setToken] = useState(null);
  const [queue, setQueue] = useState(5);
  const [caseStatus, setCaseStatus] = useState("Verification Pending");

  const bookToken = () => {
    const newToken = `A-${Math.floor(100 + Math.random() * 900)}`;
    setToken(newToken);
    setQueue(5);
    setPage("token");
  };

  const callNext = () => {
    if (queue > 0) {
      setQueue(queue - 1);
    }
  };

  return (
    <div className="app">

      <nav className="navbar">
        <div className="brand" onClick={() => setPage("home")}>
          <div className="brand-icon">S</div>
          <div>
            <h2>SevaSlot</h2>
            <span>Smart Citizen Services</span>
          </div>
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("services")}>Book Token</button>
          <button onClick={() => setPage("track")}>Track Case</button>
          <button className="staff-btn" onClick={() => setPage("staff")}>
            Staff Portal
          </button>
        </div>
      </nav>

      {page === "home" && (
        <main>
          <section className="hero">
            <div className="hero-text">
              <div className="badge">✨ GOVERNMENT SERVICES, SIMPLIFIED</div>

              <h1>
                Skip the queue.
                <br />
                <span>Get your service.</span>
              </h1>

              <p>
                Book your digital token before visiting the government office,
                check required documents, and track your queue in real time.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => setPage("services")}
                >
                  Book a Digital Token →
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => setPage("track")}
                >
                  Track My Service
                </button>
              </div>

              <div className="mini-stats">
                <div>
                  <strong>18+</strong>
                  <span>Services</span>
                </div>

                <div>
                  <strong>32 min</strong>
                  <span>Avg. wait saved</span>
                </div>

                <div>
                  <strong>24/7</strong>
                  <span>Tracking</span>
                </div>
              </div>
            </div>

            <div className="hero-card">
              <div className="floating-card top-card">
                🟢 Queue moving
              </div>

              <div className="phone">
                <div className="phone-top"></div>

                <div className="phone-content">
                  <span className="small-label">YOUR TOKEN</span>
                  <h2>{token || "A-127"}</h2>

                  <div className="queue-circle">
                    <strong>{queue}</strong>
                    <span>ahead</span>
                  </div>

                  <p>Estimated wait</p>

                  <strong className="wait-time">
                    {queue * 3 + 3} minutes
                  </strong>

                  <div className="progress">
                    <div
                      style={{
                        width: `${Math.max(15, 80 - queue * 10)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="floating-card bottom-card">
                📍 District Service Center
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="section-heading">
              <span>HOW IT WORKS</span>
              <h2>One visit. Zero confusion.</h2>
            </div>

            <div className="feature-grid">
              <div className="feature-card purple-card">
                <div className="feature-icon">📋</div>
                <h3>Check Documents</h3>
                <p>
                  Know exactly what you need before leaving home.
                </p>
              </div>

              <div className="feature-card blue-card">
                <div className="feature-icon">🎟️</div>
                <h3>Book Your Token</h3>
                <p>
                  Reserve a digital slot and avoid unnecessary queues.
                </p>
              </div>

              <div className="feature-card green-card">
                <div className="feature-icon">📍</div>
                <h3>Track Your Queue</h3>
                <p>
                  See your position and estimated waiting time live.
                </p>
              </div>

              <div className="feature-card orange-card">
                <div className="feature-icon">✅</div>
                <h3>Track Your Case</h3>
                <p>
                  Know whether your service is pending or completed.
                </p>
              </div>
            </div>
          </section>
        </main>
      )}

      {page === "services" && (
        <main className="page-container">
          <div className="page-title">
            <span>STEP 1</span>
            <h1>What service do you need?</h1>
            <p>Select a government service to continue.</p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <div
                key={service.name}
                className={`service-card ${service.color}`}
                onClick={() => setSelectedService(service)}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>View required documents</p>
                <span>→</span>
              </div>
            ))}
          </div>

          {selectedService && (
            <div className="checklist-box">
              <div>
                <span className="step-label">STEP 2</span>
                <h2>Document Checklist</h2>

                <p>
                  Required documents for{" "}
                  <strong>{selectedService.name}</strong>
                </p>
              </div>

              <div className="document-list">
                {selectedService.docs.map((doc) => (
                  <div className="document" key={doc}>
                    <span>✓</span>
                    {doc}
                  </div>
                ))}
              </div>

              <button className="primary-btn" onClick={bookToken}>
                Confirm & Get Token →
              </button>
            </div>
          )}
        </main>
      )}

      {page === "token" && (
        <main className="token-page">
          <div className="success-icon">✓</div>

          <span className="step-label">TOKEN CONFIRMED</span>

          <h1>Your digital token is ready!</h1>

          <p>You don't need to stand in the queue.</p>

          <div className="token-card">
            <span>YOUR TOKEN</span>

            <h2>{token}</h2>

            <div className="token-info">
              <div>
                <span>People Ahead</span>
                <strong>{queue}</strong>
              </div>

              <div>
                <span>Estimated Wait</span>
                <strong>{queue * 3 + 3} min</strong>
              </div>

              <div>
                <span>Counter</span>
                <strong>Counter 04</strong>
              </div>
            </div>

            <div className="qr-box">
              <div className="fake-qr">▦</div>

              <div>
                <strong>Scan at the office</strong>
                <p>Show this QR at check-in.</p>
              </div>
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() => setPage("track")}
          >
            Track My Queue →
          </button>
        </main>
      )}

      {page === "track" && (
        <main className="page-container">
          <div className="page-title">
            <span>LIVE TRACKING</span>

            <h1>Track your service</h1>

            <p>
              Your queue position updates as the counter serves citizens.
            </p>
          </div>

          <div className="tracking-layout">
            <div className="live-card">
              <div className="live-header">
                <span className="live-dot"></span>
                LIVE QUEUE
              </div>

              <h2>{token || "A-127"}</h2>

              <div className="position">
                <strong>{queue}</strong>

                <span>people ahead of you</span>
              </div>

              <div className="queue-bar">
                <div
                  style={{
                    width: `${Math.max(10, 100 - queue * 12)}%`,
                  }}
                />
              </div>

              <div className="eta">
                <span>Estimated waiting time</span>

                <strong>{queue * 3 + 3} minutes</strong>
              </div>

              <button
                className="primary-btn"
                onClick={() => setPage("staff")}
              >
                Open Staff Demo →
              </button>
            </div>

            <div className="case-card">
              <span className="step-label">CASE TRACKING</span>

              <h2>#{token || "SS-2026-00127"}</h2>

              <div className="timeline">
                <div className="timeline-item completed">
                  <span>✓</span>

                  <div>
                    <strong>Token Booked</strong>
                    <p>Digital token generated</p>
                  </div>
                </div>

                <div className="timeline-item completed">
                  <span>✓</span>

                  <div>
                    <strong>Documents Submitted</strong>
                    <p>Documents verified</p>
                  </div>
                </div>

                <div className="timeline-item current">
                  <span>●</span>

                  <div>
                    <strong>{caseStatus}</strong>
                    <p>Income proof is being verified</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <span>○</span>

                  <div>
                    <strong>Service Completed</strong>
                    <p>Certificate will be available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {page === "staff" && (
        <main className="page-container">
          <div className="staff-heading">
            <div>
              <span>STAFF PORTAL</span>

              <h1>Queue Management</h1>

              <p>
                District Service Center • Counter 04
              </p>
            </div>

            <div className="staff-status">
              🟢 Office Open
            </div>
          </div>

          <div className="dashboard-stats">
            <div>
              <span>Now Serving</span>
              <strong>A-122</strong>
            </div>

            <div>
              <span>Waiting</span>
              <strong>18</strong>
            </div>

            <div>
              <span>Avg. Service</span>
              <strong>6 min</strong>
            </div>

            <div>
              <span>Completed</span>
              <strong>42</strong>
            </div>
          </div>

          <div className="dashboard">
            <div className="queue-table">
              <h2>Today's Queue</h2>

              {["A-123", "A-124", "A-125", "A-126", token || "A-127"].map(
                (item, index) => (
                  <div className="queue-row" key={item}>
                    <div className="queue-number">
                      {index + 1}
                    </div>

                    <strong>{item}</strong>

                    <span>
                      {item === token ? "Demo Citizen" : "Citizen"}
                    </span>

                    <b>
                      {index === 0 ? "NEXT" : "WAITING"}
                    </b>
                  </div>
                )
              )}

              <button
                className="primary-btn full-btn"
                onClick={callNext}
              >
                📢 CALL NEXT CITIZEN
              </button>
            </div>

            <div className="counter-card">
              <span>NOW SERVING</span>

              <h2>A-122</h2>

              <p>Counter 04</p>

              <div className="counter-icon">👤</div>

              <button
                className="complete-btn"
                onClick={() => setCaseStatus("Completed")}
              >
                ✓ Complete Service
              </button>
            </div>
          </div>
        </main>
      )}

      <footer>
        <strong>SevaSlot</strong>

        <span>
          Hackstreet Girls • Morrow 1.0
        </span>
      </footer>
    </div>
  );
}

export default App;