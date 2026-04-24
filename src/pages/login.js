import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const STREAMING = [
  { id: "netflix", label: "Netflix", color: "#E50914", icon: "N" },
  { id: "disney", label: "Disney+", color: "#0063E5", icon: "D" },
  { id: "hulu", label: "Hulu", color: "#1CE783", icon: "H" },
  { id: "prime", label: "Prime", color: "#00A8E1", icon: "P" },
];

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [step, setStep] = useState("main"); // 'main' | 'streaming-auth' | 'loading'
  const [selectedStream, setSelectedStream] = useState(null);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const handleStreamLogin = (stream) => {
    setSelectedStream(stream);
    setStep("streaming-auth");
  };

  const handleStreamConnect = () => {
    setStep("loading");
    setTimeout(() => router.push("/app"), 1800);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setStep("loading");
    setTimeout(() => {
      if (mode === "signup") router.push("/onboarding");
      else router.push("/app");
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Sign In - NChill</title>
      </Head>

      <style>{`
        .login-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .login-root { grid-template-columns: 1fr; }
          .login-art { display: none !important; }
        }
        .login-art {
          background: linear-gradient(160deg, #2e1018 0%, #1A0F12 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 4rem;
          position: relative;
          overflow: hidden;
          border-right: 1px solid var(--border);
        }
        .login-art-quote {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-style: italic;
          line-height: 1.3;
          color: var(--fg);
          position: relative;
          z-index: 1;
        }
        .login-art-quote em { color: var(--accent); display: block; }
        .film-strip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          display: flex;
          gap: 0;
          height: 120px;
          overflow: hidden;
          opacity: 0.3;
        }
        .film-cell {
          flex: 1;
          border-right: 2px solid rgba(255,255,255,0.1);
          border-top: 2px solid rgba(255,255,255,0.1);
        }
        .login-form-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 3rem 2rem;
          min-height: 100vh;
        }
        .login-box {
          width: 100%;
          max-width: 420px;
        }
        .mode-toggle {
          display: flex;
          gap: 0;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 4px;
          margin-bottom: 2rem;
        }
        .mode-btn {
          flex: 1;
          padding: 0.55rem 1rem;
          border: none;
          background: transparent;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: rgba(245,233,226,0.45);
          cursor: pointer;
          transition: all 0.2s;
        }
        .mode-btn.active {
          background: var(--accent);
          color: #1A0F12;
          box-shadow: 0 2px 12px rgba(217,123,138,0.3);
        }
        .stream-btn {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          width: 100%;
          padding: 0.85rem 1.1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--fg);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          margin-bottom: 0.6rem;
        }
        .stream-btn:hover { border-color: var(--accent); background: var(--accent-dim); }
        .stream-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          color: #fff;
          flex-shrink: 0;
        }
        .or-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.2rem 0;
          color: rgba(245,233,226,0.25);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .or-divider::before, .or-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .loading-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          min-height: 100vh;
          text-align: center;
        }
        .loading-logo {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-style: italic;
          color: var(--accent);
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .streaming-connect-box {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
        }
        .stream-logo-big {
          width: 64px; height: 64px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin: 0 auto 1rem;
        }
        .error-msg {
          color: var(--accent);
          font-size: 0.82rem;
          margin-top: 0.4rem;
          padding: 0.5rem 0.75rem;
          background: var(--accent-dim);
          border-radius: 8px;
          border: 1px solid rgba(217,123,138,0.25);
        }
      `}</style>

      {step === "loading" && (
        <div className="loading-screen">
          <div className="loading-logo">NChill</div>
          <p style={{ color: "rgba(245,233,226,0.4)", fontSize: "0.9rem" }}>
            Setting the mood…
          </p>
        </div>
      )}

      {step !== "loading" && (
        <div className="login-root">
          {/* ART PANEL */}
          <div className="login-art">
            <div
              className="orb orb-rose"
              style={{
                width: 400,
                height: 400,
                top: "-100px",
                right: "-100px",
                opacity: 0.6,
              }}
            />
            <div
              className="orb orb-gold"
              style={{
                width: 300,
                height: 300,
                bottom: "80px",
                left: "-80px",
                opacity: 0.5,
              }}
            />

            <Link href={"/"}>
              <Image src="/logo.png" alt="NChill" width={120} height={64} />
            </Link>

            <div className="login-art-quote">
              "Every great love story
              <br />
              starts with a<br />
              <em>great film."</em>
            </div>

            <p
              style={{
                color: "rgba(245,233,226,0.4)",
                marginTop: "2rem",
                fontSize: "0.85rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              Join 240,000+ people matching
              <br />
              through cinematic taste.
            </p>

            <div className="film-strip">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="film-cell"
                  style={{
                    background: `hsl(${330 + i * 8}, 40%, ${10 + i * 2}%)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* FORM PANEL */}
          <div className="login-form-panel">
            <div className="login-box">
              {step === "main" && (
                <>
                  <h2
                    style={{
                      fontFamily: "Playfair Display, serif",
                      marginBottom: "0.4rem",
                      fontSize: "2rem",
                    }}
                  >
                    {mode === "signin" ? "Welcome back" : "Create account"}
                  </h2>
                  <p
                    style={{
                      color: "rgba(245,233,226,0.45)",
                      fontSize: "0.9rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {mode === "signin"
                      ? "Sign in to your NChill account."
                      : "Start matching through cinema."}
                  </p>

                  <div className="mode-toggle">
                    <button
                      className={`mode-btn ${mode === "signin" ? "active" : ""}`}
                      onClick={() => setMode("signin")}
                    >
                      Sign In
                    </button>
                    <button
                      className={`mode-btn ${mode === "signup" ? "active" : ""}`}
                      onClick={() => setMode("signup")}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Streaming options */}
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(245,233,226,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      fontWeight: 600,
                      marginBottom: "0.75rem",
                    }}
                  >
                    Continue with streaming
                  </p>
                  {STREAMING.map((s) => (
                    <button
                      key={s.id}
                      className="stream-btn"
                      onClick={() => handleStreamLogin(s)}
                    >
                      <div
                        className="stream-icon"
                        style={{ background: s.color }}
                      >
                        {s.icon}
                      </div>
                      <span>Continue with {s.label}</span>
                      <span
                        style={{
                          marginLeft: "auto",
                          opacity: 0.3,
                          fontSize: "0.8rem",
                        }}
                      >
                        →
                      </span>
                    </button>
                  ))}

                  <div className="or-divider">or with email</div>

                  <form onSubmit={handleEmailLogin}>
                    {mode === "signup" && (
                      <div className="mb-3">
                        <label className="nc-label">Full Name</label>
                        <input
                          className="nc-input"
                          type="text"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                        />
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="nc-label">Email</label>
                      <input
                        className="nc-input"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => {
                          setError("");
                          setForm((f) => ({ ...f, email: e.target.value }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="nc-label">Password</label>
                      <input
                        className="nc-input"
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => {
                          setError("");
                          setForm((f) => ({ ...f, password: e.target.value }));
                        }}
                      />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    {mode === "signin" && (
                      <p
                        style={{
                          textAlign: "right",
                          fontSize: "0.8rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <a
                          href="#"
                          style={{
                            color: "var(--accent)",
                            textDecoration: "none",
                          }}
                        >
                          Forgot password?
                        </a>
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn-rose w-100"
                      style={{ padding: "0.85rem", fontSize: "0.95rem" }}
                    >
                      {mode === "signin" ? "Sign In" : "Create Account"}
                    </button>
                  </form>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "0.78rem",
                      color: "rgba(245,233,226,0.3)",
                      marginTop: "1.5rem",
                    }}
                  >
                    By continuing, you agree to NChill's{" "}
                    <a
                      href="#"
                      style={{ color: "var(--accent)", textDecoration: "none" }}
                    >
                      Terms
                    </a>{" "}
                    &{" "}
                    <a
                      href="#"
                      style={{ color: "var(--accent)", textDecoration: "none" }}
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </>
              )}

              {step === "streaming-auth" && selectedStream && (
                <div className="streaming-connect-box fade-up fade-up-1">
                  <div
                    className="stream-logo-big"
                    style={{ background: selectedStream.color }}
                  >
                    {selectedStream.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Playfair Display, serif",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Connect {selectedStream.label}
                  </h3>
                  <p
                    style={{
                      color: "rgba(245,233,226,0.5)",
                      fontSize: "0.88rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    NChill will import your watch history to power your match
                    algorithm. We never post on your behalf.
                  </p>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      padding: "0.75rem 1rem",
                      marginBottom: "1.5rem",
                      textAlign: "left",
                    }}
                  >
                    {[
                      "Read your watch history",
                      "Access your genre preferences",
                      "Never share your data",
                    ].map((p) => (
                      <p
                        key={p}
                        style={{
                          fontSize: "0.82rem",
                          color: "rgba(245,233,226,0.6)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <span
                          style={{ color: "var(--accent)", marginRight: 6 }}
                        >
                          ✓
                        </span>
                        {p}
                      </p>
                    ))}
                  </div>
                  <button
                    className="btn-rose w-100 mb-2"
                    style={{ padding: "0.85rem" }}
                    onClick={handleStreamConnect}
                  >
                    Authorize {selectedStream.label}
                  </button>
                  <button
                    className="btn-ghost w-100"
                    style={{ padding: "0.85rem" }}
                    onClick={() => setStep("main")}
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
