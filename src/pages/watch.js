import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  { from: "Lena", text: "this opening scene 😭", time: "8:04", self: false },
  { from: "me", text: "I know I know", time: "8:04", self: true },
  {
    from: "Lena",
    text: "the way the light changes…",
    time: "8:07",
    self: false,
  },
  { from: "me", text: "Céline Song is a genius", time: "8:07", self: true },
  { from: "Lena", text: "💕", time: "8:08", self: false },
];

const REACTIONS = ["❤️", "😂", "😮", "😢", "🔥", "👏"];

const QUEUE = [
  { title: "Past Lives", duration: "1h 45m", active: true, color: "#6B3A5C" },
  { title: "Aftersun", duration: "1h 42m", active: false, color: "#2A4A5C" },
  {
    title: "The Worst Person in the World",
    duration: "2h 8m",
    active: false,
    color: "#3A4A2A",
  },
];

export default function Watch() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(18); // percent
  const [messages, setMessages] = useState(MESSAGES);
  const [input, setInput] = useState("");
  const [showReactions, setShowReactions] = useState(false);
  const [floatingReaction, setFloatingReaction] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [activePanel, setActivePanel] = useState("chat"); // 'chat' | 'queue'
  const [isMuted, setIsMuted] = useState(false);
  const chatRef = useRef(null);

  // Simulate progress
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + 0.05, 100));
    }, 500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "me", text: input.trim(), time: "8:12", self: true },
    ]);
    setInput("");
  };

  const sendReaction = (emoji) => {
    setFloatingReaction(emoji);
    setShowReactions(false);
    setTimeout(() => setFloatingReaction(null), 1200);
  };

  const formatTime = (pct) => {
    const totalMins = 105;
    const current = Math.floor((pct / 100) * totalMins);
    const h = Math.floor(current / 60);
    const m = current % 60;
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Head>
        <title>Past Lives - NChill Watch Room</title>
      </Head>

      <style>{`
        .watch-root {
          height: 100vh;
          display: grid;
          grid-template-rows: 1fr;
          grid-template-columns: 1fr 340px;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .watch-root { grid-template-columns: 1fr; grid-template-rows: 45vh 1fr; }
          .watch-side { border-left: none !important; border-top: 1px solid var(--border); }
        }
        .watch-main {
          position: relative;
          background: #000;
          display: flex;
          flex-direction: column;
        }
        .watch-screen {
          flex: 1;
          background: linear-gradient(160deg, #1a0820 0%, #0d0a1a 40%, #0a1a0d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .film-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.6;
          mix-blend-mode: overlay;
        }
        .movie-visual {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .movie-title-overlay {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-style: italic;
          color: rgba(245,233,226,0.08);
          text-align: center;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.03em;
        }
        .play-pause-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .play-icon-big {
          width: 70px; height: 70px;
          border-radius: 50%;
          background: rgba(217,123,138,0.2);
          border: 2px solid rgba(217,123,138,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
          color: rgba(245,233,226,0.8);
          backdrop-filter: blur(4px);
          transition: all 0.3s;
          opacity: ${`${isPlaying ? 0 : 1}`};
        }
        .watch-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 1rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
          z-index: 10;
          transition: opacity 0.3s;
        }
        .watch-title-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .viewing-with {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 0.3rem 0.75rem 0.3rem 0.4rem;
          backdrop-filter: blur(4px);
        }
        .viewer-dot { width: 8px; height: 8px; border-radius: 50%; background: #78c88c; }
        .viewer-name { font-size: 0.78rem; color: rgba(255,255,255,0.7); font-weight: 500; }
        .watch-controls-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.5rem 1.2rem 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
          z-index: 10;
          transition: opacity 0.3s;
        }
        .progress-track {
          height: 4px;
          background: rgba(255,255,255,0.15);
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 0.75rem;
          position: relative;
        }
        .progress-fill-watch {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--gold));
          border-radius: 4px;
          position: relative;
        }
        .progress-thumb {
          position: absolute;
          right: -5px; top: 50%;
          transform: translateY(-50%);
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(217,123,138,0.6);
        }
        .ctrl-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ctrl-left { display: flex; align-items: center; gap: 1rem; }
        .ctrl-right { display: flex; align-items: center; gap: 0.75rem; }
        .ctrl-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.75);
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.3rem;
          transition: color 0.2s;
          display: flex; align-items: center;
        }
        .ctrl-btn:hover { color: #fff; }
        .ctrl-btn.main {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(217,123,138,0.2);
          border: 1px solid rgba(217,123,138,0.4);
          font-size: 1rem;
        }
        .time-display { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.5); }
        .volume-slider {
          width: 70px;
          height: 3px;
          -webkit-appearance: none;
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
          outline: none;
        }
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          cursor: pointer;
        }
        .reaction-float {
          position: absolute;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3rem;
          animation: floatUp 1.2s ease forwards;
          pointer-events: none;
          z-index: 20;
        }
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-80px) scale(1.5); }
        }
        /* SIDE PANEL */
        .watch-side {
          display: flex;
          flex-direction: column;
          background: var(--card);
          border-left: 1px solid var(--border);
          overflow: hidden;
        }
        .side-header {
          padding: 1rem 1.2rem 0;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .side-tabs {
          display: flex;
          gap: 0;
          margin-top: 0.75rem;
          margin-bottom: -1px;
        }
        .side-tab {
          padding: 0.6rem 1rem;
          background: transparent;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(245,233,226,0.35);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .side-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        .msg-bubble {
          max-width: 80%;
          padding: 0.5rem 0.85rem;
          border-radius: 14px;
          font-size: 0.87rem;
          line-height: 1.4;
        }
        .msg-self {
          align-self: flex-end;
          background: var(--accent-dim);
          border: 1px solid rgba(217,123,138,0.25);
          color: var(--fg);
          border-bottom-right-radius: 4px;
        }
        .msg-other {
          align-self: flex-start;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-bottom-left-radius: 4px;
        }
        .msg-name { font-size: 0.65rem; color: var(--accent); font-weight: 600; margin-bottom: 0.2rem; }
        .msg-time { font-size: 0.62rem; color: rgba(245,233,226,0.25); margin-top: 0.2rem; text-align: right; }
        .chat-input-bar {
          padding: 0.85rem 1.2rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 0.6rem;
          align-items: center;
          flex-shrink: 0;
          position: relative;
        }
        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 0.55rem 1rem;
          color: var(--fg);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input:focus { border-color: var(--accent); }
        .chat-input::placeholder { color: rgba(245,233,226,0.25); }
        .send-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--accent);
          border: none;
          color: #1A0F12;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .send-btn:hover { background: #e88e9c; }
        .react-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          font-size: 1rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .react-btn:hover { border-color: var(--accent); }
        .reactions-popup {
          position: absolute;
          bottom: 60px;
          right: 1.2rem;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 0.6rem;
          display: flex;
          gap: 0.3rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          z-index: 50;
        }
        .reaction-opt {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: transparent;
          border: none;
          font-size: 1.3rem;
          cursor: pointer;
          transition: background 0.15s;
          display: flex; align-items: center; justify-content: center;
        }
        .reaction-opt:hover { background: rgba(255,255,255,0.07); }
        /* QUEUE */
        .queue-list { flex: 1; overflow-y: auto; padding: 0.75rem 1.2rem; }
        .queue-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .queue-item:last-child { border-bottom: none; }
        .queue-thumb {
          width: 40px; height: 56px;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .queue-active-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }
      `}</style>

      <div className="watch-root">
        {/* MAIN VIDEO AREA */}
        <div className="watch-main">
          <div className="watch-screen" onClick={() => setIsPlaying((p) => !p)}>
            <div className="film-grain" />
            <div className="movie-visual">
              <div className="movie-title-overlay">Past Lives</div>
            </div>

            {/* Floating reaction */}
            {floatingReaction && (
              <div className="reaction-float">{floatingReaction}</div>
            )}

            {/* Play/Pause overlay */}
            <div className="play-pause-overlay">
              <div
                className="play-icon-big"
                style={{ opacity: isPlaying ? 0 : 1 }}
              >
                ▶
              </div>
            </div>

            {/* Top bar */}
            <div className="watch-top-bar">
              <div className="watch-title-bar">
                <Link
                  href="/matches"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontSize: "1.2rem",
                  }}
                >
                  ←
                </Link>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "Playfair Display, serif",
                      fontSize: "1rem",
                      fontStyle: "italic",
                      color: "#fff",
                    }}
                  >
                    Past Lives
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    2023 · Romance · Drama
                  </p>
                </div>
              </div>
              <div className="viewing-with">
                <div className="viewer-dot" />
                <span className="viewer-name">Lena is watching</span>
              </div>
            </div>

            {/* Controls */}
            <div className="watch-controls-bar">
              <div
                className="progress-track"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = ((e.clientX - rect.left) / rect.width) * 100;
                  setProgress(Math.max(0, Math.min(100, pct)));
                }}
              >
                <div
                  className="progress-fill-watch"
                  style={{ width: `${progress}%` }}
                >
                  <div className="progress-thumb" />
                </div>
              </div>
              <div className="ctrl-row">
                <div className="ctrl-left">
                  <button
                    className="ctrl-btn"
                    onClick={() => setProgress((p) => Math.max(0, p - 3))}
                  >
                    ⏮
                  </button>
                  <button
                    className="ctrl-btn main"
                    onClick={() => setIsPlaying((p) => !p)}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <button
                    className="ctrl-btn"
                    onClick={() => setProgress((p) => Math.min(100, p + 3))}
                  >
                    ⏭
                  </button>
                  <button
                    className="ctrl-btn"
                    onClick={() => setIsMuted((m) => !m)}
                  >
                    {isMuted ? "🔇" : "🔊"}
                  </button>
                  <input
                    type="range"
                    className="volume-slider"
                    min={0}
                    max={100}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      setIsMuted(false);
                    }}
                  />
                  <span className="time-display">
                    {formatTime(progress)} / 1:45:00
                  </span>
                </div>
                <div className="ctrl-right">
                  <button className="ctrl-btn" title="Subtitles">
                    CC
                  </button>
                  <button className="ctrl-btn" title="Fullscreen">
                    ⛶
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="watch-side">
          <div className="side-header">
            <div className="d-flex align-items-center justify-content-between">
              <div
                className="viewing-with"
                style={{
                  background: "var(--accent-dim)",
                  border: "1px solid rgba(217,123,138,0.25)",
                  padding: "0.3rem 0.75rem 0.3rem 0.5rem",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8B4A6B, #8B4A6B88)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                  }}
                >
                  LE
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--fg)",
                    fontWeight: 600,
                  }}
                >
                  Lena
                </span>
                <div className="viewer-dot" style={{ width: 6, height: 6 }} />
              </div>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.7rem",
                  color: "rgba(245,233,226,0.3)",
                }}
              >
                Synced ✓
              </span>
            </div>
            <div className="side-tabs">
              <button
                className={`side-tab ${activePanel === "chat" ? "active" : ""}`}
                onClick={() => setActivePanel("chat")}
              >
                Chat
              </button>
              <button
                className={`side-tab ${activePanel === "queue" ? "active" : ""}`}
                onClick={() => setActivePanel("queue")}
              >
                Queue
              </button>
            </div>
          </div>

          {activePanel === "chat" && (
            <>
              <div className="chat-messages" ref={chatRef}>
                <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: "rgba(245,233,226,0.25)",
                      fontFamily: "DM Mono, monospace",
                    }}
                  >
                    Today · 8:00 PM
                  </span>
                </div>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.self ? "flex-end" : "flex-start",
                    }}
                  >
                    {!msg.self && <p className="msg-name">{msg.from}</p>}
                    <div
                      className={`msg-bubble ${msg.self ? "msg-self" : "msg-other"}`}
                    >
                      {msg.text}
                    </div>
                    <p className="msg-time">{msg.time}</p>
                  </div>
                ))}
              </div>
              <div className="chat-input-bar">
                {showReactions && (
                  <div className="reactions-popup">
                    {REACTIONS.map((r) => (
                      <button
                        key={r}
                        className="reaction-opt"
                        onClick={() => sendReaction(r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="react-btn"
                  onClick={() => setShowReactions((s) => !s)}
                >
                  😊
                </button>
                <input
                  className="chat-input"
                  placeholder="Say something…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="send-btn" onClick={sendMessage}>
                  →
                </button>
              </div>
            </>
          )}

          {activePanel === "queue" && (
            <div className="queue-list">
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(245,233,226,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                Up Next
              </p>
              {QUEUE.map((q, i) => (
                <div
                  key={q.title}
                  className="queue-item"
                  style={{ opacity: q.active ? 1 : 0.55 }}
                >
                  <div
                    className="queue-thumb"
                    style={{
                      background: `linear-gradient(135deg, ${q.color}99, ${q.color})`,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "Playfair Display, serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {q.title}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.72rem",
                        color: "rgba(245,233,226,0.35)",
                      }}
                    >
                      {q.duration}
                    </p>
                    {q.active && (
                      <span
                        className="pill pill-rose"
                        style={{ marginTop: "0.3rem", fontSize: "0.6rem" }}
                      >
                        Now Playing
                      </span>
                    )}
                  </div>
                  {q.active && <div className="queue-active-dot" />}
                </div>
              ))}
              <button
                className="btn-ghost w-100 mt-3"
                style={{ padding: "0.6rem", fontSize: "0.82rem" }}
              >
                + Add to Queue
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
