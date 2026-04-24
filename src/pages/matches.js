import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const MY_MATCHES = [
  {
    id: 1,
    name: "Lena",
    age: 27,
    avatar: "LE",
    color: "#8B4A6B",
    compatibility: 94,
    status: "mutual", // 'mutual' | 'pending' | 'waiting'
    lastActive: "2m ago",
    genres: ["Drama", "Romance"],
    suggestedMovie: "Past Lives",
    movieColor: "#6B3A5C",
    message: "Can't wait to watch together 💕",
    messageTime: "8:14 PM",
  },
  {
    id: 2,
    name: "Ashley",
    age: 30,
    avatar: "MA",
    color: "#4A5C8B",
    compatibility: 88,
    status: "mutual",
    lastActive: "12m ago",
    genres: ["Sci-Fi", "Thriller"],
    suggestedMovie: "Dune: Part Two",
    movieColor: "#5C4A2A",
    message: "Dune Saturday night?",
    messageTime: "Yesterday",
  },
  {
    id: 3,
    name: "Jessy",
    age: 25,
    avatar: "YU",
    color: "#4A7A5C",
    compatibility: 81,
    status: "pending",
    lastActive: "2h ago",
    genres: ["Animation", "Fantasy"],
    suggestedMovie: null,
    movieColor: null,
    message: null,
    messageTime: null,
  },
];

const HISTORY = [
  {
    with: "Lena",
    movie: "Aftersun",
    date: "Apr 18",
    duration: "1h 42m",
    rating: "❤️",
  },
  {
    with: "Ashley",
    movie: "Oppenheimer",
    date: "Apr 14",
    duration: "3h 1m",
    rating: "🔥",
  },
];

const STATUS_CONFIG = {
  mutual: {
    label: "Mutual Match",
    color: "#78c88c",
    bg: "rgba(120,200,140,0.1)",
    dot: "#78c88c",
  },
  pending: {
    label: "Awaiting Them",
    color: "var(--gold)",
    bg: "var(--gold-dim)",
    dot: "#CFAF6E",
  },
  waiting: {
    label: "They chose you!",
    color: "var(--accent)",
    bg: "var(--accent-dim)",
    dot: "#D97B8A",
  },
};

export default function Matches() {
  const [activeTab, setActiveTab] = useState("active");

  const mutuals = MY_MATCHES.filter((m) => m.status === "mutual");
  const pending = MY_MATCHES.filter((m) => m.status !== "mutual");

  return (
    <>
      <Head>
        <title>Your Matches - NChill</title>
      </Head>

      <style>{`
        .matches-root { min-height: 100vh; padding-bottom: 80px; }
        .page-header {
          padding: 1.5rem 1.5rem 0;
          position: sticky;
          top: 0;
          background: rgba(26,15,18,0.96);
          backdrop-filter: blur(12px);
          z-index: 40;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0;
        }
        .page-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; margin: 0; }
        .tab-row {
          display: flex;
          gap: 0;
          margin-top: 1.2rem;
          border-bottom: 1px solid var(--border);
        }
        .tab-btn {
          padding: 0.7rem 1.3rem;
          background: transparent;
          border: none;
          color: rgba(245,233,226,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          margin-bottom: -1px;
        }
        .tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }
        .match-row-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          margin: 1rem 1.5rem 0;
          overflow: hidden;
          transition: all 0.3s;
        }
        .match-row-card:hover { border-color: var(--accent); }
        .match-row-top {
          padding: 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .match-avatar {
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem;
          color: rgba(255,255,255,0.9);
          flex-shrink: 0;
          position: relative;
        }
        .status-indicator {
          position: absolute;
          bottom: 0; right: 0;
          width: 12px; height: 12px;
          border-radius: 50%;
          border: 2px solid var(--card);
        }
        .match-info { flex: 1; min-width: 0; }
        .match-name-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem; }
        .match-name-sm { font-family: 'Playfair Display', serif; font-size: 1rem; margin: 0; }
        .status-pill {
          font-size: 0.63rem;
          padding: 0.15rem 0.5rem;
          border-radius: 100px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }
        .match-sub { font-size: 0.75rem; color: rgba(245,233,226,0.35); margin: 0; }
        .match-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
        .icon-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .icon-btn:hover { background: var(--accent-dim); border-color: var(--accent); }
        .match-movie-strip {
          border-top: 1px solid var(--border);
          padding: 0.8rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255,255,255,0.015);
        }
        .movie-mini-thumb {
          width: 36px; height: 52px;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .last-msg {
          font-size: 0.8rem;
          color: rgba(245,233,226,0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-style: italic;
        }
        .compat-mini { font-size: 0.68rem; color: var(--gold); }
        .pending-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          margin: 1rem 1.5rem 0;
          padding: 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0.7;
        }
        .history-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .history-thumb {
          width: 40px; height: 56px;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(245,233,226,0.3);
        }
        .empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .section-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245,233,226,0.3);
          padding: 1.5rem 1.5rem 0.4rem;
        }
      `}</style>

      <div className="matches-root">
        {/* Header */}
        <div className="page-header">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.72rem",
                  color: "rgba(245,233,226,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                }}
              >
                My Connections
              </p>
              <h1 className="page-title">Matches</h1>
            </div>
            <Link
              href="/app"
              className="btn-ghost"
              style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}
            >
              + Find More
            </Link>
          </div>
          <div className="tab-row">
            {["active", "history"].map((t) => (
              <button
                key={t}
                className={`tab-btn ${activeTab === t ? "active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t === "active"
                  ? `Active (${MY_MATCHES.length})`
                  : `History (${HISTORY.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE TAB */}
        {activeTab === "active" && (
          <div>
            {mutuals.length > 0 && (
              <>
                <p className="section-label">
                  ✦ Mutual Matches - Ready to Watch
                </p>
                {mutuals.map((m, i) => {
                  const sc = STATUS_CONFIG[m.status];
                  return (
                    <div
                      key={m.id}
                      className={`match-row-card fade-up fade-up-${i + 1}`}
                    >
                      <div className="match-row-top">
                        <div
                          className="match-avatar"
                          style={{
                            background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`,
                          }}
                        >
                          {m.avatar}
                          <div
                            className="status-indicator"
                            style={{ background: sc.dot }}
                          />
                        </div>
                        <div className="match-info">
                          <div className="match-name-row">
                            <h5 className="match-name-sm">
                              {m.name}, {m.age}
                            </h5>
                            <span
                              className="status-pill"
                              style={{ background: sc.bg, color: sc.color }}
                            >
                              {sc.label}
                            </span>
                          </div>
                          <p className="match-sub">
                            {m.compatibility}% match · Active {m.lastActive}
                          </p>
                          <div className="d-flex gap-1 mt-1">
                            {m.genres.map((g) => (
                              <span
                                key={g}
                                style={{
                                  fontSize: "0.63rem",
                                  padding: "0.1rem 0.45rem",
                                  borderRadius: "5px",
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid var(--border)",
                                  color: "rgba(245,233,226,0.45)",
                                }}
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="match-actions">
                          <div className="icon-btn" title="Message">
                            💬
                          </div>
                          <Link
                            href="/watch"
                            className="icon-btn"
                            title="Start Watch Room"
                          >
                            ▶
                          </Link>
                        </div>
                      </div>
                      {(m.suggestedMovie || m.message) && (
                        <div className="match-movie-strip">
                          {m.suggestedMovie && (
                            <div
                              className="movie-mini-thumb"
                              style={{
                                background: `linear-gradient(135deg, ${m.movieColor}99, ${m.movieColor})`,
                              }}
                            />
                          )}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            {m.suggestedMovie && (
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "0.78rem",
                                  fontWeight: 600,
                                  marginBottom: "0.1rem",
                                }}
                              >
                                Suggested:{" "}
                                <em style={{ color: "var(--accent)" }}>
                                  {m.suggestedMovie}
                                </em>
                              </p>
                            )}
                            {m.message && (
                              <p className="last-msg">
                                "{m.message}" · {m.messageTime}
                              </p>
                            )}
                          </div>
                          <Link
                            href="/watch"
                            className="btn-rose"
                            style={{
                              padding: "0.4rem 0.9rem",
                              fontSize: "0.75rem",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Watch →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {pending.length > 0 && (
              <>
                <p className="section-label" style={{ paddingTop: "2rem" }}>
                  ⏳ Awaiting Response
                </p>
                {pending.map((m) => {
                  const sc = STATUS_CONFIG[m.status];
                  return (
                    <div key={m.id} className="pending-card">
                      <div
                        className="match-avatar"
                        style={{
                          background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`,
                          width: 44,
                          height: 44,
                          fontSize: "0.85rem",
                        }}
                      >
                        {m.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: 600,
                            fontSize: "0.92rem",
                          }}
                        >
                          {m.name}, {m.age}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "rgba(245,233,226,0.35)",
                          }}
                        >
                          {m.compatibility}% match · Active {m.lastActive}
                        </p>
                      </div>
                      <span
                        className="status-pill"
                        style={{
                          background: sc.bg,
                          color: sc.color,
                          fontSize: "0.68rem",
                          padding: "0.2rem 0.6rem",
                          borderRadius: 100,
                        }}
                      >
                        {sc.label}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === "history" && (
          <div style={{ marginTop: "1rem" }}>
            {HISTORY.length > 0 ? (
              HISTORY.map((h, i) => (
                <div key={i} className="history-row">
                  <div
                    className="history-thumb"
                    style={{ background: `hsl(${300 + i * 60}, 30%, 25%)` }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        fontFamily: "Playfair Display, serif",
                      }}
                    >
                      {h.movie}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.75rem",
                        color: "rgba(245,233,226,0.4)",
                      }}
                    >
                      with {h.with} · {h.date} · {h.duration}
                    </p>
                  </div>
                  <span style={{ fontSize: "1.3rem" }}>{h.rating}</span>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <span className="empty-icon">🎬</span>
                <p>No watch history yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <Link href="/app">
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
          <Link href="/matches" className="active">
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
