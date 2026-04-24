import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MATCHES = [
  {
    id: 1,
    name: "Lena",
    age: 27,
    compatibility: 94,
    genres: ["Drama", "Romance", "Indie"],
    recentWatch: "Past Lives",
    bio: "Cried during Aftersun. Will probably cry during ours too.",
    avatar: "LE",
    color: "#8B4A6B",
    status: "online",
    sharedTitles: 7,
  },
  {
    id: 2,
    name: "Ashley",
    age: 30,
    compatibility: 88,
    genres: ["Sci-Fi", "Thriller", "Documentary"],
    recentWatch: "Oppenheimer",
    bio: "3-hour epics are a love language. Let's build a watch list.",
    avatar: "MA",
    color: "#4A5C8B",
    status: "online",
    sharedTitles: 5,
  },
  {
    id: 3,
    name: "Jessy",
    age: 25,
    compatibility: 81,
    genres: ["Animation", "Fantasy", "Comedy"],
    recentWatch: "The Boy and the Heron",
    bio: "If you hate Miyazaki we're probably not a match.",
    avatar: "YU",
    color: "#4A7A5C",
    status: "away",
    sharedTitles: 4,
  },
];

const SUGGESTIONS = [
  {
    title: "Past Lives",
    genre: "Romance · Drama",
    year: 2023,
    color: "#6B3A5C",
    match: 98,
  },
  {
    title: "Dune: Part Two",
    genre: "Sci-Fi · Epic",
    year: 2024,
    color: "#5C4A2A",
    match: 91,
  },
  {
    title: "Aftersun",
    genre: "Drama · Indie",
    year: 2022,
    color: "#2A4A5C",
    match: 87,
  },
];

export default function App() {
  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState("");
  const MAX_FREE = 2;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected((s) => s.filter((v) => v !== id));
      return;
    }
    if (selected.length >= MAX_FREE) {
      showToast(
        `Free plan: select up to ${MAX_FREE} matches. Upgrade for more.`,
      );
      return;
    }
    setSelected((s) => [...s, id]);
    showToast("Match added! They'll be notified.");
  };

  return (
    <>
      <Head>
        <title>Your Matches - NChill</title>
      </Head>

      <style>{`
        .app-root {
          min-height: 100vh;
          padding-bottom: 80px;
        }
        .app-header {
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          background: rgba(26,15,18,0.95);
          backdrop-filter: blur(12px);
          z-index: 40;
        }
        .greeting { font-size: 0.78rem; color: rgba(245,233,226,0.4); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
        .timer-badge {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--gold);
          background: var(--gold-dim);
          border: 1px solid rgba(207,175,110,0.25);
          border-radius: 8px;
          padding: 0.35rem 0.7rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 1rem;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          margin: 0;
        }
        .match-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.25rem;
          margin: 0 1.5rem 1rem;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .match-card.selected {
          border-color: var(--accent);
          background: linear-gradient(135deg, #241114 0%, rgba(217,123,138,0.07) 100%);
        }
        .match-card-glow {
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.15;
          pointer-events: none;
        }
        .avatar-lg {
          width: 54px; height: 54px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          color: rgba(255,255,255,0.9);
          flex-shrink: 0;
          position: relative;
        }
        .status-dot {
          position: absolute;
          bottom: 2px; right: 2px;
          width: 10px; height: 10px;
          border-radius: 50%;
          border: 2px solid var(--card);
        }
        .match-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          margin: 0;
          line-height: 1;
        }
        .match-meta { font-size: 0.78rem; color: rgba(245,233,226,0.4); margin-top: 0.15rem; }
        .compat-bar {
          height: 4px;
          background: var(--border);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 0.4rem;
          margin-bottom: 0.15rem;
        }
        .compat-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--gold));
          border-radius: 4px;
          transition: width 1s ease;
        }
        .match-bio {
          font-size: 0.85rem;
          color: rgba(245,233,226,0.55);
          line-height: 1.5;
          margin: 0.75rem 0;
          font-style: italic;
        }
        .tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .genre-tag {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          color: rgba(245,233,226,0.5);
        }
        .select-btn {
          padding: 0.55rem 1.2rem;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .select-btn.unselected {
          background: var(--accent-dim);
          color: var(--accent);
          border: 1px solid rgba(217,123,138,0.3);
        }
        .select-btn.unselected:hover { background: var(--accent); color: #1A0F12; }
        .select-btn.active {
          background: var(--accent);
          color: #1A0F12;
        }
        .shared-badge {
          font-size: 0.7rem;
          color: var(--gold);
          background: var(--gold-dim);
          border: 1px solid rgba(207,175,110,0.2);
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
        }
        .limit-bar {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.85rem 1.25rem;
          margin: 0 1.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .limit-pips { display: flex; gap: 0.4rem; }
        .pip {
          width: 28px; height: 6px;
          border-radius: 4px;
          background: var(--border);
          transition: background 0.3s;
        }
        .pip.filled { background: var(--accent); }
        .movie-row-scroll {
          display: flex;
          gap: 0.85rem;
          overflow-x: auto;
          padding: 0 1.5rem 1rem;
          scrollbar-width: none;
        }
        .movie-row-scroll::-webkit-scrollbar { display: none; }
        .movie-thumb {
          flex-shrink: 0;
          width: 120px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          position: relative;
        }
        .movie-thumb-bg {
          aspect-ratio: 2/3;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0.6rem;
        }
        .movie-thumb h6 {
          font-family: 'Playfair Display', serif;
          font-size: 0.72rem;
          color: #fff;
          text-shadow: 0 1px 6px rgba(0,0,0,0.9);
          margin: 0;
          line-height: 1.2;
        }
        .movie-thumb p { font-size: 0.58rem; color: rgba(255,255,255,0.55); margin: 0.2rem 0 0; }
        .match-badge { position: absolute; top: 0.4rem; right: 0.4rem; }
        .toast-bar {
          position: fixed;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.75rem 1.25rem;
          font-size: 0.85rem;
          z-index: 200;
          white-space: nowrap;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          animation: fadeUp 0.3s ease;
        }
        .watch-cta {
          background: linear-gradient(135deg, rgba(217,123,138,0.08), rgba(207,175,110,0.06));
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.25rem;
          margin: 0 1.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .watch-cta-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: var(--accent-dim);
          border: 1px solid rgba(217,123,138,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }
      `}</style>

      <div className="app-root">
        {/* Header */}
        <div className="app-header">
          <div>
            <div className="greeting">Good evening</div>
            <Link href={"/"}>
              <Image src="/logo.png" alt="NChill" width={120} height={64} />
            </Link>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="timer-badge">⏱ Refreshes in 18:42:05</div>
            <Link href="/profile">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--accent), var(--gold))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#1A0F12",
                  cursor: "pointer",
                }}
              >
                AV
              </div>
            </Link>
          </div>
        </div>

        {/* Selection limit bar */}
        <div className="limit-bar">
          <div className="limit-pips">
            {Array.from({ length: MAX_FREE }).map((_, i) => (
              <div
                key={i}
                className={`pip ${i < selected.length ? "filled" : ""}`}
              />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 600 }}>
              {selected.length}/{MAX_FREE} matches selected
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.7rem",
                color: "rgba(245,233,226,0.35)",
              }}
            >
              Free plan ·{" "}
              <Link
                href="/upgrade"
                style={{ color: "var(--gold)", textDecoration: "none" }}
              >
                Upgrade for 4 of 6
              </Link>
            </p>
          </div>
          {selected.length > 0 && (
            <Link
              href="/matches"
              className="btn-rose"
              style={{
                padding: "0.45rem 1rem",
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
              }}
            >
              View Matches →
            </Link>
          )}
        </div>

        {/* Today's matches */}
        <div className="section-header">
          <h2 className="section-title">Today's Matches</h2>
          <span className="pill pill-rose">{MATCHES.length} options</span>
        </div>

        {MATCHES.map((m, i) => (
          <div
            key={m.id}
            className={`match-card fade-up fade-up-${i + 1} ${selected.includes(m.id) ? "selected" : ""}`}
          >
            <div className="match-card-glow" style={{ background: m.color }} />

            <div className="d-flex align-items-start gap-3 mb-3">
              <div
                className="avatar-lg"
                style={{
                  background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
                }}
              >
                {m.avatar}
                <div
                  className="status-dot"
                  style={{
                    background: m.status === "online" ? "#78c88c" : "#CFAF6E",
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="d-flex align-items-center gap-2">
                  <h5 className="match-name">
                    {m.name}, {m.age}
                  </h5>
                  <span className="shared-badge">
                    ✦ {m.sharedTitles} shared
                  </span>
                </div>
                <p className="match-meta">
                  Recently watched: <em>{m.recentWatch}</em>
                </p>
                <div className="compat-bar">
                  <div
                    className="compat-fill"
                    style={{ width: `${m.compatibility}%` }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--gold)",
                    margin: 0,
                  }}
                >
                  {m.compatibility}% cinematic match
                </p>
              </div>
            </div>

            <p className="match-bio">"{m.bio}"</p>

            <div className="d-flex align-items-center justify-content-between">
              <div className="tag-row">
                {m.genres.map((g) => (
                  <span key={g} className="genre-tag">
                    {g}
                  </span>
                ))}
              </div>
              <button
                className={`select-btn ${selected.includes(m.id) ? "active" : "unselected"}`}
                onClick={() => handleSelect(m.id)}
              >
                {selected.includes(m.id) ? "✓ Selected" : "+ Select"}
              </button>
            </div>
          </div>
        ))}

        {/* AI movie suggestions */}
        <div className="section-header" style={{ paddingTop: "0.5rem" }}>
          <h2 className="section-title">Watch Tonight</h2>
          <Link
            href="#"
            style={{
              fontSize: "0.8rem",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            See all
          </Link>
        </div>

        <div className="movie-row-scroll">
          {SUGGESTIONS.map((m) => (
            <div key={m.title} className="movie-thumb">
              <div
                className="movie-thumb-bg"
                style={{
                  background: `linear-gradient(180deg, ${m.color}88 0%, ${m.color}ee 100%)`,
                }}
              >
                <div className="match-badge">
                  <span
                    className="pill pill-gold"
                    style={{ fontSize: "0.58rem", padding: "0.1rem 0.4rem" }}
                  >
                    {m.match}%
                  </span>
                </div>
                <h6>{m.title}</h6>
                <p>{m.genre}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Watch CTA */}
        <div className="watch-cta">
          <div className="watch-cta-icon">🎬</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>
              Ready to watch with a match?
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.78rem",
                color: "rgba(245,233,226,0.45)",
              }}
            >
              Select a match above, then start a watch room.
            </p>
          </div>
          <Link
            href="/watch"
            className="btn-ghost"
            style={{
              padding: "0.45rem 1rem",
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
            }}
          >
            Start Room
          </Link>
        </div>

        {/* Toast */}
        {toast && <div className="toast-bar">{toast}</div>}

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <Link href="/app" className="active">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </Link>
          <Link href="/matches">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            Matches
          </Link>
          <Link href="/watch">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            Watch
          </Link>
          <Link href="/profile">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </Link>
        </nav>
      </div>
    </>
  );
}
