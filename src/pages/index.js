import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const GENRES = [
  "Romance",
  "Thriller",
  "Sci-Fi",
  "Comedy",
  "Drama",
  "Horror",
  "Documentary",
  "Animation",
];

const MOVIES = [
  { title: "Past Lives", genre: "Romance", year: 2023, color: "#8B4A6B" },
  { title: "Oppenheimer", genre: "Drama", year: 2023, color: "#4A5C8B" },
  { title: "Parasite", genre: "Thriller", year: 2019, color: "#4A7A5C" },
  { title: "Dune", genre: "Sci-Fi", year: 2021, color: "#7A6B4A" },
  {
    title: "Everything Everywhere",
    genre: "Comedy",
    year: 2022,
    color: "#6B4A7A",
  },
  { title: "The Bear", genre: "Drama", year: 2022, color: "#7A4A4A" },
];

const TESTIMONIALS = [
  {
    name: "Priya M.",
    text: "We bonded over Parasite on our first watch date. Six months later - still going strong.",
    avatar: "PM",
  },
  {
    name: "Jake R.",
    text: "Finally an app that gets it. No awkward coffee dates, just vibes and movies.",
    avatar: "JR",
  },
  {
    name: "Sofia T.",
    text: "Met my boyfriend through NChill. We watched Dune together before ever meeting IRL.",
    avatar: "ST",
  },
];

export default function Index() {
  const [activeGenre, setActiveGenre] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const interval = setInterval(() => {
      setActiveGenre((g) => (g + 1) % GENRES.length);
    }, 1800);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>NChill - Watch Together, Connect Deeper</title>
        <meta
          name="description"
          content="AI-powered dating through shared movie taste."
        />
      </Head>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7rem 0 4rem;
          position: relative;
          overflow: hidden;
        }
        .hero-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 6rem);
          line-height: 1.05;
          color: var(--fg);
        }
        .hero-headline em {
          font-style: italic;
          color: var(--accent);
          display: block;
        }
        .genre-ticker {
          display: inline-block;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: var(--gold);
          min-width: 200px;
          transition: opacity 0.3s;
        }
        .hero-sub {
          font-size: 1.15rem;
          color: rgba(245,233,226,0.6);
          max-width: 480px;
          line-height: 1.7;
        }
        .streaming-logos {
          display: flex;
          gap: 1.2rem;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 1rem;
        }
        .stream-badge {
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.45rem 0.9rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(245,233,226,0.5);
          letter-spacing: 0.03em;
        }
        .movie-float-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.75rem;
          transform: rotate(4deg);
          transform-origin: center;
        }
        .movie-card-mini {
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 2/3;
          position: relative;
          border: 1px solid var(--border);
        }
        .movie-card-mini-bg {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0.75rem;
        }
        .movie-card-mini h6 {
          font-family: 'Playfair Display', serif;
          font-size: 0.75rem;
          margin: 0;
          color: #fff;
          text-shadow: 0 1px 6px rgba(0,0,0,0.8);
        }
        .movie-card-mini span {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.6);
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: var(--gold);
          display: block;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.78rem;
          color: rgba(245,233,226,0.45);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .how-step {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: var(--card);
          transition: all 0.3s;
        }
        .how-step:hover { border-color: var(--accent); transform: translateX(6px); }
        .step-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid rgba(217,123,138,0.3);
          border-radius: 8px;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-weight: 600;
        }
        .plan-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .plan-card.premium {
          border-color: var(--gold);
          background: linear-gradient(135deg, #241114 0%, #2e1a0e 100%);
        }
        .plan-card:hover { transform: translateY(-4px); }
        .plan-price {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          color: var(--fg);
          line-height: 1;
        }
        .plan-price sup { font-size: 1.2rem; vertical-align: super; }
        .plan-price sub { font-size: 1rem; color: rgba(245,233,226,0.4); }
        .feature-check { color: var(--accent); margin-right: 0.5rem; }
        .testimonial-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .avatar-circle {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--gold));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: #1A0F12;
          flex-shrink: 0;
        }
        .footer-section {
          border-top: 1px solid var(--border);
          padding: 3rem 0;
          text-align: center;
          color: rgba(245,233,226,0.35);
          font-size: 0.85rem;
        }
        .nav-scrolled {
          background: rgba(26,15,18,0.97) !important;
          box-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }
        .cta-section {
          background: linear-gradient(135deg, rgba(217,123,138,0.08) 0%, rgba(207,175,110,0.06) 100%);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 4rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
      `}</style>

      {/* NAV */}
      <nav className={`nc-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <Link href={"/"}>
          <Image src="/logo.png" alt="NChill" width={120} height={64} />
        </Link>
        <div className="d-flex gap-3 align-items-center">
          <Link
            href="/login"
            className="btn-ghost"
            style={{ padding: "0.5rem 1.3rem", fontSize: "0.85rem" }}
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="btn-rose"
            style={{ padding: "0.5rem 1.3rem", fontSize: "0.85rem" }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero-section">
          {/* Orbs */}
          <div
            className="orb orb-rose"
            style={{ width: 600, height: 600, top: "-200px", right: "-100px" }}
          />
          <div
            className="orb orb-gold"
            style={{ width: 400, height: 400, bottom: "0", left: "-150px" }}
          />

          <div
            className="container"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="pill pill-rose mb-4 fade-up fade-up-1">
                  ✦ AI-Powered Dating
                </div>
                <h1 className="hero-headline mb-4 fade-up fade-up-2">
                  Date from your
                  <br />
                  <em>couch.</em>
                  Match by
                  <br />
                  <span className="genre-ticker">
                    {GENRES[activeGenre]}
                  </span>{" "}
                  taste.
                </h1>
                <p className="hero-sub mb-5 fade-up fade-up-3">
                  No awkward coffee dates. No prep time. NChill matches you with
                  people who love what you love - then lets you watch together.
                </p>
                <div className="d-flex gap-3 flex-wrap mb-5 fade-up fade-up-4">
                  <Link
                    href="/login"
                    className="btn-rose"
                    style={{ fontSize: "1rem", padding: "0.85rem 2.2rem" }}
                  >
                    Start Watching Free
                  </Link>
                  <Link
                    href="#how"
                    className="btn-ghost"
                    style={{ fontSize: "1rem", padding: "0.85rem 2.2rem" }}
                  >
                    See How It Works
                  </Link>
                </div>
                <div className="fade-up fade-up-5">
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(245,233,226,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                      marginBottom: "0.75rem",
                    }}
                  >
                    Connect your streaming accounts
                  </p>
                  <div className="streaming-logos">
                    {["Netflix", "Disney+", "Hulu", "Prime"].map((s) => (
                      <span key={s} className="stream-badge">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 d-none d-lg-block">
                <div
                  className="movie-float-grid"
                  style={{ maxWidth: 360, margin: "0 auto" }}
                >
                  {MOVIES.map((m, i) => (
                    <div
                      key={m.title}
                      className="movie-card-mini fade-up"
                      style={{
                        animationDelay: `${0.1 + i * 0.08}s`,
                        opacity: 0,
                      }}
                    >
                      <div
                        className="movie-card-mini-bg"
                        style={{
                          background: `linear-gradient(180deg, ${m.color}99 0%, ${m.color}ee 100%)`,
                        }}
                      >
                        <h6>{m.title}</h6>
                        <span>
                          {m.genre} · {m.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section
          className="py-5"
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container">
            <div className="row g-4">
              {[
                { n: "240K+", l: "Active Users" },
                { n: "1.2M", l: "Watch Sessions" },
                { n: "38K", l: "Connections Made" },
                { n: "4.8★", l: "App Rating" },
              ].map((s) => (
                <div key={s.l} className="col-6 col-md-3 stat-item">
                  <span className="stat-num">{s.n}</span>
                  <span className="stat-label">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          className="py-6 py-md-5"
          id="how"
          style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <div className="pill pill-gold mb-3">How It Works</div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Simple as pressing play
              </h2>
            </div>
            <div className="row g-3 justify-content-center">
              <div className="col-lg-8">
                {[
                  {
                    n: "01",
                    title: "Tell us your taste",
                    desc: "Log in with Netflix, Disney+, Hulu, or Prime - or fill out a quick preference form. Our AI reads your taste immediately.",
                  },
                  {
                    n: "02",
                    title: "Get your matches",
                    desc: "Open the app and receive curated match profiles based on cinematic compatibility. Free users get 3, Premium users get 6.",
                  },
                  {
                    n: "03",
                    title: "Choose thoughtfully",
                    desc: "Select up to 2 matches (free) or 4 (premium). When both people select each other - it's a connection.",
                  },
                  {
                    n: "04",
                    title: "Watch together",
                    desc: "Jump into a synchronized watch room. Real-time reactions, chat, and a shared movie queue. No commute required.",
                  },
                ].map((step, i) => (
                  <div
                    key={step.n}
                    className="how-step mb-3 fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="step-num">{step.n}</div>
                    <div>
                      <h5
                        style={{
                          fontFamily: "Playfair Display, serif",
                          marginBottom: "0.3rem",
                          fontSize: "1.1rem",
                        }}
                      >
                        {step.title}
                      </h5>
                      <p
                        style={{
                          margin: 0,
                          color: "rgba(245,233,226,0.55)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          style={{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <div className="pill pill-rose mb-3">Pricing</div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Start free, fall deeper
              </h2>
            </div>
            <div className="row g-4 justify-content-center">
              <div className="col-md-5">
                <div className="plan-card h-100">
                  <div className="pill pill-rose mb-3">Free</div>
                  <div className="plan-price mb-1">
                    <sup>$</sup>0<sub>/mo</sub>
                  </div>
                  <p
                    style={{
                      color: "rgba(245,233,226,0.4)",
                      fontSize: "0.85rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    No credit card needed
                  </p>
                  <hr className="nc-divider" />
                  {[
                    "3 match options per cycle",
                    "Select up to 2 matches",
                    "4 hours watch time / week",
                    "Basic movie queue",
                    "In-app chat",
                  ].map((f) => (
                    <p
                      key={f}
                      style={{ fontSize: "0.9rem", marginBottom: "0.6rem" }}
                    >
                      <span className="feature-check">✓</span>
                      {f}
                    </p>
                  ))}
                  <Link
                    href="/login"
                    className="btn-ghost w-100 text-center mt-4"
                    style={{ display: "block" }}
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
              <div className="col-md-5">
                <div className="plan-card premium h-100">
                  <div
                    style={{
                      position: "absolute",
                      top: "1.2rem",
                      right: "1.2rem",
                    }}
                    className="pill pill-gold"
                  >
                    Popular
                  </div>
                  <div className="pill pill-gold mb-3">Premium</div>
                  <div
                    className="plan-price mb-1"
                    style={{ color: "var(--gold)" }}
                  >
                    <sup>$</sup>12<sub>/mo</sub>
                  </div>
                  <p
                    style={{
                      color: "rgba(245,233,226,0.4)",
                      fontSize: "0.85rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Billed monthly
                  </p>
                  <hr className="nc-divider" />
                  {[
                    "6 match options per cycle",
                    "Select up to 4 matches",
                    "Unlimited watch time",
                    "Advanced movie queue",
                    "Priority matching AI",
                    "Profile boosts",
                    "Watch history insights",
                  ].map((f) => (
                    <p
                      key={f}
                      style={{ fontSize: "0.9rem", marginBottom: "0.6rem" }}
                    >
                      <span
                        style={{ color: "var(--gold)", marginRight: "0.5rem" }}
                      >
                        ✦
                      </span>
                      {f}
                    </p>
                  ))}
                  <Link
                    href="/upgrade"
                    className="btn-gold w-100 text-center mt-4"
                    style={{ display: "block" }}
                  >
                    Upgrade to Premium
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          style={{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Real connections,
                <br />
                <em
                  style={{
                    color: "var(--accent)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  real stories
                </em>
              </h2>
            </div>
            <div className="row g-4">
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} className="col-md-4">
                  <div className="testimonial-card h-100">
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "rgba(245,233,226,0.75)",
                        lineHeight: "1.7",
                        marginBottom: "1.5rem",
                      }}
                    >
                      "{t.text}"
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <div className="avatar-circle">{t.avatar}</div>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                        {t.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
          <div className="container">
            <div className="cta-section">
              <div
                className="orb orb-rose"
                style={{
                  width: 300,
                  height: 300,
                  top: "-100px",
                  right: "10%",
                  opacity: 0.5,
                }}
              />
              <div className="pill pill-gold mb-4">Ready?</div>
              <h2
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                  marginBottom: "1rem",
                }}
              >
                Your next great match
                <br />
                is one movie away.
              </h2>
              <p
                style={{
                  color: "rgba(245,233,226,0.5)",
                  marginBottom: "2.5rem",
                  fontSize: "1.05rem",
                }}
              >
                Free to join. No swiping. Just cinema and connection.
              </p>
              <Link
                href="/login"
                className="btn-rose"
                style={{ fontSize: "1.05rem", padding: "0.95rem 2.8rem" }}
              >
                Start Watching Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-section">
        <div className="container">
          <Link href={"/"}>
            <Image src="/logo.png" alt="NChill" width={120} height={64} />
          </Link>
          <p>
            © 2025 NChill Inc. ·{" "}
            <a href="#" style={{ color: "inherit" }}>
              Privacy
            </a>{" "}
            ·{" "}
            <a href="#" style={{ color: "inherit" }}>
              Terms
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
