import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const STEPS = ["genres", "mood", "streaming", "dealbreakers", "done"];

const GENRES = [
  { id: "romance", label: "Romance", emoji: "💕" },
  { id: "thriller", label: "Thriller", emoji: "🔪" },
  { id: "scifi", label: "Sci-Fi", emoji: "🚀" },
  { id: "comedy", label: "Comedy", emoji: "😂" },
  { id: "drama", label: "Drama", emoji: "🎭" },
  { id: "horror", label: "Horror", emoji: "👻" },
  { id: "documentary", label: "Documentary", emoji: "🎬" },
  { id: "animation", label: "Animation", emoji: "✨" },
  { id: "action", label: "Action", emoji: "💥" },
  { id: "indie", label: "Indie", emoji: "🎞️" },
  { id: "fantasy", label: "Fantasy", emoji: "🐉" },
  { id: "musical", label: "Musical", emoji: "🎵" },
];

const MOODS = [
  { id: "cozy", label: "Cozy & Comforting", desc: "Feel-good, warm stories" },
  { id: "intense", label: "Intense & Gripping", desc: "Edge-of-seat tension" },
  {
    id: "thoughtful",
    label: "Thoughtful & Deep",
    desc: "Films that make you think",
  },
  { id: "fun", label: "Light & Fun", desc: "Easy, entertaining watches" },
  {
    id: "adventurous",
    label: "Epic & Adventurous",
    desc: "Big worlds, big stakes",
  },
  {
    id: "emotional",
    label: "Emotional & Moving",
    desc: "Films that hit different",
  },
];

const STREAMING_OPTS = [
  { id: "netflix", label: "Netflix", color: "#E50914" },
  { id: "disney", label: "Disney+", color: "#0063E5" },
  { id: "hulu", label: "Hulu", color: "#1CE783" },
  { id: "prime", label: "Prime Video", color: "#00A8E1" },
  { id: "apple", label: "Apple TV+", color: "#555" },
  { id: "hbo", label: "Max (HBO)", color: "#9B59B6" },
];

const DEALBREAKERS = [
  "Graphic violence",
  "Strong language",
  "Sexual content",
  "Animal harm",
  "Child endangerment",
  "Jump scares",
  "Heavy substance use",
  "Political themes",
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [genres, setGenres] = useState([]);
  const [mood, setMood] = useState(null);
  const [services, setServices] = useState([]);
  const [dealbreakers, setDealbreakers] = useState([]);
  const [finishing, setFinishing] = useState(false);

  const toggle = (arr, setArr, val) =>
    setArr((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );

  const canNext = () => {
    if (STEPS[step] === "genres") return genres.length >= 3;
    if (STEPS[step] === "mood") return mood !== null;
    if (STEPS[step] === "streaming") return services.length >= 1;
    return true;
  };

  const handleNext = () => {
    if (step < STEPS.length - 2) {
      setStep((s) => s + 1);
      return;
    }
    if (STEPS[step] === "dealbreakers") {
      setFinishing(true);
      setTimeout(() => router.push("/app"), 2200);
    }
  };

  const progress = (step / (STEPS.length - 1)) * 100;

  if (finishing) {
    return (
      <>
        <Head>
          <title>Setting up - NChill</title>
        </Head>
        <style>{`.finishing { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2rem; text-align:center; }
          @keyframes grow { from {width:0} to {width:100%} }
          .ai-bar { height:3px; background: linear-gradient(90deg, var(--accent), var(--gold)); border-radius:4px; animation: grow 2s ease forwards; }
        `}</style>
        <div className="finishing">
          <div
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "2.5rem",
              fontStyle: "italic",
              color: "var(--accent)",
            }}
          >
            NChill
          </div>
          <div>
            <p
              style={{
                color: "rgba(245,233,226,0.5)",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              Building your cinematic profile…
            </p>
            <div
              style={{
                width: 240,
                height: 3,
                background: "var(--border)",
                borderRadius: 4,
              }}
            >
              <div className="ai-bar" />
            </div>
          </div>
          <p style={{ color: "rgba(245,233,226,0.25)", fontSize: "0.8rem" }}>
            Analyzing taste · Calibrating matches · Almost there
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Set Your Taste - NChill</title>
      </Head>

      <style>{`
        .onboard-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .progress-bar-wrap {
          height: 3px;
          background: var(--border);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 3rem;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--gold));
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        .step-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: rgba(245,233,226,0.3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .step-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .step-sub {
          color: rgba(245,233,226,0.45);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }
        .genre-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--card);
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.2s;
          user-select: none;
          white-space: nowrap;
          margin: 0.3rem;
        }
        .genre-chip:hover { border-color: var(--accent); }
        .genre-chip.selected {
          background: var(--accent-dim);
          border-color: var(--accent);
          color: var(--accent);
        }
        .mood-card {
          padding: 1.2rem 1.4rem;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--card);
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 0.75rem;
        }
        .mood-card:hover { border-color: var(--accent); }
        .mood-card.selected {
          background: var(--accent-dim);
          border-color: var(--accent);
        }
        .mood-card h6 { font-weight: 600; margin: 0; font-size: 0.95rem; }
        .mood-card p { margin: 0; font-size: 0.8rem; color: rgba(245,233,226,0.45); margin-top: 0.2rem; }
        .stream-chip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1.2rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--card);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.6rem;
        }
        .stream-chip:hover { border-color: var(--accent); }
        .stream-chip.selected { background: var(--accent-dim); border-color: var(--accent); }
        .stream-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
        .db-chip {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--card);
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s;
          margin: 0.25rem;
          user-select: none;
        }
        .db-chip:hover { border-color: rgba(217,123,138,0.5); }
        .db-chip.selected {
          background: rgba(217,123,138,0.12);
          border-color: var(--accent);
          color: var(--accent);
        }
        .bottom-bar {
          margin-top: auto;
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .min-note {
          font-size: 0.75rem;
          color: rgba(245,233,226,0.25);
          margin-top: 0.75rem;
        }
        .check-circle {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          color: #1A0F12;
          margin-left: auto;
          flex-shrink: 0;
        }
      `}</style>

      <div className="onboard-root">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Link href={"/"}>
            <Image src="/logo.png" alt="NChill" width={120} height={64} />
          </Link>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.75rem",
              color: "rgba(245,233,226,0.3)",
            }}
          >
            {step + 1} / {STEPS.length - 1}
          </span>
        </div>

        {/* Progress */}
        <div className="progress-bar-wrap">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* STEP: GENRES */}
        {STEPS[step] === "genres" && (
          <div className="fade-up fade-up-1">
            <div className="step-label">Step 1 of 4</div>
            <h2 className="step-title">What genres move you?</h2>
            <p className="step-sub">
              Pick at least 3 genres you genuinely love. This is the foundation
              of your matches.
            </p>
            <div style={{ margin: "-0.3rem" }}>
              {GENRES.map((g) => (
                <button
                  key={g.id}
                  className={`genre-chip ${genres.includes(g.id) ? "selected" : ""}`}
                  onClick={() => toggle(genres, setGenres, g.id)}
                >
                  <span>{g.emoji}</span> {g.label}
                  {genres.includes(g.id) && (
                    <span style={{ fontSize: "0.7rem" }}>✓</span>
                  )}
                </button>
              ))}
            </div>
            {genres.length > 0 && (
              <p className="min-note">
                {genres.length} selected{" "}
                {genres.length < 3
                  ? `- pick ${3 - genres.length} more`
                  : "- great!"}
              </p>
            )}
          </div>
        )}

        {/* STEP: MOOD */}
        {STEPS[step] === "mood" && (
          <div className="fade-up fade-up-1">
            <div className="step-label">Step 2 of 4</div>
            <h2 className="step-title">What's your usual vibe?</h2>
            <p className="step-sub">
              Think about your perfect Friday night watch. What feeling are you
              chasing?
            </p>
            {MOODS.map((m) => (
              <div
                key={m.id}
                className={`mood-card ${mood === m.id ? "selected" : ""}`}
                onClick={() => setMood(m.id)}
              >
                <div className="d-flex align-items-center">
                  <div>
                    <h6
                      style={{
                        color: mood === m.id ? "var(--accent)" : "var(--fg)",
                      }}
                    >
                      {m.label}
                    </h6>
                    <p>{m.desc}</p>
                  </div>
                  {mood === m.id && <div className="check-circle">✓</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP: STREAMING */}
        {STEPS[step] === "streaming" && (
          <div className="fade-up fade-up-1">
            <div className="step-label">Step 3 of 4</div>
            <h2 className="step-title">What do you stream?</h2>
            <p className="step-sub">
              We'll match you with people who have access to the same platforms
              - so you can actually watch together.
            </p>
            {STREAMING_OPTS.map((s) => (
              <div
                key={s.id}
                className={`stream-chip ${services.includes(s.id) ? "selected" : ""}`}
                onClick={() => toggle(services, setServices, s.id)}
              >
                <div className="stream-dot" style={{ background: s.color }} />
                <span>{s.label}</span>
                {services.includes(s.id) && (
                  <span className="check-circle" style={{ marginLeft: "auto" }}>
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* STEP: DEALBREAKERS */}
        {STEPS[step] === "dealbreakers" && (
          <div className="fade-up fade-up-1">
            <div className="step-label">Step 4 of 4</div>
            <h2 className="step-title">Any dealbreakers?</h2>
            <p className="step-sub">
              These are content types you'd rather avoid. Tap anything that
              applies - or skip this entirely.
            </p>
            <div style={{ margin: "-0.25rem 0 1rem" }}>
              {DEALBREAKERS.map((d) => (
                <button
                  key={d}
                  className={`db-chip ${dealbreakers.includes(d) ? "selected" : ""}`}
                  onClick={() => toggle(dealbreakers, setDealbreakers, d)}
                >
                  {d}
                </button>
              ))}
            </div>
            <p style={{ fontSize: "0.8rem", color: "rgba(245,233,226,0.3)" }}>
              Optional - you can always update this later in Settings.
            </p>
          </div>
        )}

        {/* BOTTOM BAR */}
        <div className="bottom-bar">
          {step > 0 ? (
            <button
              className="btn-ghost"
              style={{ padding: "0.65rem 1.5rem" }}
              onClick={() => setStep((s) => s - 1)}
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <div className="text-end">
            {STEPS[step] === "dealbreakers" && (
              <button
                className="btn-ghost me-2"
                style={{ padding: "0.65rem 1.5rem" }}
                onClick={handleNext}
              >
                Skip
              </button>
            )}
            <button
              className="btn-rose"
              style={{
                padding: "0.75rem 2rem",
                opacity: canNext() ? 1 : 0.4,
                pointerEvents: canNext() ? "auto" : "none",
              }}
              onClick={handleNext}
            >
              {STEPS[step] === "dealbreakers" ? "Finish Setup →" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
