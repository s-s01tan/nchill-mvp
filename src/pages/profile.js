import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const GENRES = ["Drama", "Romance", "Indie", "Sci-Fi", "Thriller"];
const WATCHED = [
  { title: "Past Lives", color: "#6B3A5C", year: 2023 },
  { title: "Aftersun", color: "#2A4A5C", year: 2022 },
  { title: "Oppenheimer", color: "#3A3A5C", year: 2023 },
  { title: "The Worst Person", color: "#3A5C3A", year: 2021 },
  { title: "Dune", color: "#5C4A2A", year: 2021 },
  { title: "Parasite", color: "#3A5C4A", year: 2019 },
];

const STATS = [
  { label: "Watch Sessions", value: "14" },
  { label: "Total Hours", value: "31h" },
  { label: "Connections", value: "3" },
  { label: "Match Score", value: "94%" },
];

const STREAMING = [
  { id: "netflix", label: "Netflix", color: "#E50914", connected: true },
  { id: "disney", label: "Disney+", color: "#0063E5", connected: false },
  { id: "hulu", label: "Hulu", color: "#1CE783", connected: true },
  { id: "prime", label: "Prime Video", color: "#00A8E1", connected: false },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("taste");
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(
    "Cried during Aftersun. Will probably cry during ours too. Looking for someone who notices the lighting in slow cinema.",
  );
  const [isPremium] = useState(false);

  return (
    <>
      <Head>
        <title>Profile - NChill</title>
      </Head>

      <style>{`
        .profile-root { min-height: 100vh; padding-bottom: 80px; }
        .profile-hero {
          background: linear-gradient(180deg, #2e1018 0%, var(--bg) 100%);
          padding: 2rem 1.5rem 0;
          position: relative;
          overflow: hidden;
        }
        .profile-avatar-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 1rem;
        }
        .profile-avatar {
          width: 84px; height: 84px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--gold));
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          color: #1A0F12;
          border: 3px solid var(--border);
        }
        .edit-avatar-btn {
          position: absolute;
          bottom: 0; right: 0;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: var(--card);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          cursor: pointer;
        }
        .profile-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem;
          margin: 0;
          line-height: 1.1;
        }
        .profile-plan {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 0.3rem;
        }
        .bio-block {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem 1.2rem;
          margin-top: 1rem;
          font-size: 0.88rem;
          color: rgba(245,233,226,0.65);
          font-style: italic;
          line-height: 1.6;
          cursor: pointer;
          transition: border-color 0.2s;
          position: relative;
        }
        .bio-block:hover { border-color: var(--accent); }
        .bio-edit-hint {
          position: absolute;
          top: 0.5rem; right: 0.75rem;
          font-size: 0.65rem;
          color: rgba(245,233,226,0.25);
          font-style: normal;
        }
        .bio-textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--accent);
          border-radius: 12px;
          padding: 0.85rem 1.2rem;
          color: var(--fg);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-style: italic;
          outline: none;
          resize: none;
          line-height: 1.6;
          min-height: 80px;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin: 1.5rem 0 0;
        }
        .stat-cell {
          text-align: center;
          padding: 1rem 0.5rem;
          border-right: 1px solid var(--border);
        }
        .stat-cell:last-child { border-right: none; }
        .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          color: var(--gold);
          display: block;
          line-height: 1;
        }
        .stat-lbl { font-size: 0.62rem; color: rgba(245,233,226,0.35); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; margin-top: 0.2rem; }
        .profile-tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
          padding: 0 1.5rem;
          background: rgba(26,15,18,0.95);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .profile-tab {
          padding: 0.85rem 1.1rem;
          background: transparent;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          font-weight: 600;
          color: rgba(245,233,226,0.35);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all 0.2s;
        }
        .profile-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
        .tab-content { padding: 1.5rem; }
        .genre-pill-lg {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.1rem;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--card);
          font-size: 0.85rem;
          font-weight: 500;
          margin: 0.3rem;
          color: var(--fg);
        }
        .genre-pill-lg.active { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }
        .watched-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
        }
        .watched-thumb {
          aspect-ratio: 2/3;
          border-radius: 10px;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;
        }
        .watched-thumb:hover { transform: scale(1.03); border-color: var(--accent); }
        .watched-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0.5rem 0.4rem 0.4rem;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
          font-size: 0.62rem;
          font-family: 'Playfair Display', serif;
          color: #fff;
          line-height: 1.2;
        }
        .stream-row {
          display: flex;
          align-items: center;
          padding: 0.9rem 0;
          border-bottom: 1px solid var(--border);
          gap: 1rem;
        }
        .stream-row:last-child { border-bottom: none; }
        .stream-icon-sm {
          width: 36px; height: 36px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .toggle-switch {
          position: relative;
          width: 42px; height: 24px;
          flex-shrink: 0;
        }
        .toggle-switch input { display: none; }
        .toggle-track {
          width: 100%; height: 100%;
          border-radius: 100px;
          background: var(--border);
          cursor: pointer;
          transition: background 0.25s;
          position: relative;
        }
        .toggle-track.on { background: var(--accent); }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #fff;
          transition: left 0.25s;
          left: 3px;
        }
        .toggle-track.on .toggle-thumb { left: 21px; }
        .setting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
          gap: 1rem;
        }
        .setting-row:last-child { border-bottom: none; }
        .setting-label { font-size: 0.9rem; font-weight: 500; }
        .setting-sub { font-size: 0.75rem; color: rgba(245,233,226,0.35); margin-top: 0.1rem; }
        .upgrade-strip {
          background: linear-gradient(135deg, rgba(207,175,110,0.08), rgba(217,123,138,0.06));
          border: 1px solid rgba(207,175,110,0.2);
          border-radius: 14px;
          padding: 1rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .sign-out-btn {
          width: 100%;
          padding: 0.85rem;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 12px;
          color: rgba(245,233,226,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.5rem;
        }
        .sign-out-btn:hover { border-color: rgba(217,123,138,0.4); color: var(--accent); }
      `}</style>

      <div className="profile-root">
        {/* HERO */}
        <div className="profile-hero">
          <div
            className="orb orb-rose"
            style={{
              width: 300,
              height: 300,
              top: -100,
              right: -50,
              opacity: 0.3,
            }}
          />

          <div className="d-flex align-items-start justify-content-between">
            <div>
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">AV</div>
                <div className="edit-avatar-btn">✏️</div>
              </div>
              <h2 className="profile-name">Alex V.</h2>
              <div
                className={`profile-plan ${isPremium ? "" : ""}`}
                style={{
                  color: isPremium ? "var(--gold)" : "rgba(245,233,226,0.35)",
                }}
              >
                {isPremium ? "✦ Premium" : "● Free Plan"}
                {!isPremium && (
                  <Link
                    href="/upgrade"
                    style={{
                      color: "var(--gold)",
                      textDecoration: "none",
                      marginLeft: "0.5rem",
                      fontSize: "0.7rem",
                    }}
                  >
                    Upgrade →
                  </Link>
                )}
              </div>
            </div>
            <Link
              href="/app"
              style={{
                color: "rgba(245,233,226,0.35)",
                textDecoration: "none",
                fontSize: "1.3rem",
                marginTop: "0.25rem",
              }}
            >
              ←
            </Link>
          </div>

          {/* Bio */}
          {editingBio ? (
            <div style={{ marginTop: "1rem" }}>
              <textarea
                className="bio-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
              />
              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn-rose"
                  style={{ padding: "0.45rem 1.1rem", fontSize: "0.8rem" }}
                  onClick={() => setEditingBio(false)}
                >
                  Save
                </button>
                <button
                  className="btn-ghost"
                  style={{ padding: "0.45rem 1.1rem", fontSize: "0.8rem" }}
                  onClick={() => setEditingBio(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bio-block" onClick={() => setEditingBio(true)}>
              <span className="bio-edit-hint">tap to edit</span>"{bio}"
            </div>
          )}

          {/* Stats */}
          <div className="stats-row">
            {STATS.map((s) => (
              <div key={s.label} className="stat-cell">
                <span className="stat-val">{s.value}</span>
                <p className="stat-lbl">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="profile-tabs">
          {["taste", "history", "settings"].map((t) => (
            <button
              key={t}
              className={`profile-tab ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="tab-content">
          {/* TASTE */}
          {activeTab === "taste" && (
            <div>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(245,233,226,0.3)",
                  marginBottom: "0.75rem",
                }}
              >
                Your Genres
              </p>
              <div style={{ marginBottom: "2rem" }}>
                {GENRES.map((g) => (
                  <span key={g} className="genre-pill-lg active">
                    {g}
                  </span>
                ))}
                <span
                  className="genre-pill-lg"
                  style={{
                    cursor: "pointer",
                    borderStyle: "dashed",
                    opacity: 0.5,
                  }}
                >
                  + Add
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(245,233,226,0.3)",
                  marginBottom: "0.75rem",
                }}
              >
                Watch Mood
              </p>
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "0.9rem 1.1rem",
                  marginBottom: "2rem",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p
                      style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}
                    >
                      Thoughtful & Deep
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.75rem",
                        color: "rgba(245,233,226,0.4)",
                      }}
                    >
                      Films that make you think
                    </p>
                  </div>
                  <button
                    className="btn-ghost"
                    style={{ padding: "0.4rem 0.9rem", fontSize: "0.75rem" }}
                  >
                    Change
                  </button>
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(245,233,226,0.3)",
                  marginBottom: "0.75rem",
                }}
              >
                Streaming Services
              </p>
              {STREAMING.map((s, i) => (
                <div key={s.id} className="stream-row">
                  <div
                    className="stream-icon-sm"
                    style={{ background: s.color }}
                  >
                    {s.label[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 500,
                        fontSize: "0.88rem",
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.72rem",
                        color: s.connected
                          ? "#78c88c"
                          : "rgba(245,233,226,0.3)",
                      }}
                    >
                      {s.connected ? "● Connected" : "○ Not connected"}
                    </p>
                  </div>
                  <div className="toggle-switch">
                    <div
                      className={`toggle-track ${s.connected ? "on" : ""}`}
                      onClick={() => {}}
                    >
                      <div className="toggle-thumb" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HISTORY */}
          {activeTab === "history" && (
            <div>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(245,233,226,0.3)",
                  marginBottom: "0.75rem",
                }}
              >
                Recently Watched Together
              </p>
              <div className="watched-grid mb-4">
                {WATCHED.map((w) => (
                  <div
                    key={w.title}
                    className="watched-thumb"
                    style={{
                      background: `linear-gradient(160deg, ${w.color}88 0%, ${w.color} 100%)`,
                    }}
                  >
                    <div className="watched-label">{w.title}</div>
                  </div>
                ))}
              </div>
              <button
                className="btn-ghost w-100"
                style={{ padding: "0.75rem", fontSize: "0.85rem" }}
              >
                View Full Watch History
              </button>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div>
              {!isPremium && (
                <div className="upgrade-strip">
                  <span style={{ fontSize: "1.5rem" }}>✦</span>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "var(--gold)",
                      }}
                    >
                      Unlock Premium
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.75rem",
                        color: "rgba(245,233,226,0.4)",
                      }}
                    >
                      6 matches · 4 selections · unlimited watch time
                    </p>
                  </div>
                  <Link
                    href="/upgrade"
                    className="btn-gold"
                    style={{
                      padding: "0.45rem 1rem",
                      fontSize: "0.8rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Upgrade
                  </Link>
                </div>
              )}

              {[
                {
                  label: "Push Notifications",
                  sub: "Match alerts and watch invites",
                  on: true,
                },
                {
                  label: "Match Visibility",
                  sub: "Allow others to see your profile",
                  on: true,
                },
                {
                  label: "Activity Status",
                  sub: "Show when you're online",
                  on: false,
                },
                {
                  label: "Email Digest",
                  sub: "Weekly match summary",
                  on: false,
                },
              ].map((s) => (
                <div key={s.label} className="setting-row">
                  <div>
                    <p className="setting-label">{s.label}</p>
                    <p className="setting-sub">{s.sub}</p>
                  </div>
                  <div className="toggle-switch">
                    <div className={`toggle-track ${s.on ? "on" : ""}`}>
                      <div className="toggle-thumb" />
                    </div>
                  </div>
                </div>
              ))}

              <div className="setting-row" style={{ cursor: "pointer" }}>
                <div>
                  <p className="setting-label">Dealbreakers</p>
                  <p className="setting-sub">Content you prefer to avoid</p>
                </div>
                <span
                  style={{ color: "rgba(245,233,226,0.3)", fontSize: "0.9rem" }}
                >
                  →
                </span>
              </div>

              <div className="setting-row" style={{ cursor: "pointer" }}>
                <div>
                  <p className="setting-label">Account & Privacy</p>
                  <p className="setting-sub">Manage data and security</p>
                </div>
                <span
                  style={{ color: "rgba(245,233,226,0.3)", fontSize: "0.9rem" }}
                >
                  →
                </span>
              </div>

              <button className="sign-out-btn">Sign Out</button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.72rem",
                  color: "rgba(245,233,226,0.2)",
                  marginTop: "1rem",
                }}
              >
                NChill v1.0.0 · Made with ❤️ for cinema lovers
              </p>
            </div>
          )}
        </div>

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
          <Link href="/profile" className="active">
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
