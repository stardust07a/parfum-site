import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || "Login failed");

    // customer ise kaydet
    localStorage.setItem("customerUser", JSON.stringify(data.user));
    navigate("/checkout");
  };

  return (
    <div className="obso-auth">
      <style>{`
        .obso-auth{
          background:
            radial-gradient(1200px 700px at 18% -10%, rgba(212,175,55,.18), transparent 60%),
            radial-gradient(900px 600px at 95% 0%, rgba(120,170,255,.10), transparent 55%),
            linear-gradient(180deg, #07070a 0%, #0b0b10 50%, #08080b 100%);
          min-height: 100vh;
          display:flex;
          align-items:center;
          padding: 30px 0;
        }

        .obso-card{
          border-radius: 20px;
          border: 1px solid rgba(212,175,55,.14);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 18px 60px rgba(0,0,0,.35);
          overflow:hidden;
        }

        .obso-topGlow{
          height: 8px;
          background: linear-gradient(90deg, rgba(212,175,55,.90), rgba(255,255,255,.10), rgba(120,170,255,.18));
          opacity: .85;
        }

        .obso-pad{ padding: 16px; }

        .obso-pill{
          display:inline-flex;
          align-items:center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(212,175,55,.22);
          background: rgba(212,175,55,.08);
          color: rgba(255,255,255,.88);
          font-weight: 1000;
          letter-spacing: .14em;
          font-size: 12px;
        }

        .obso-title{
          margin: 12px 0 0;
          color: #fff;
          font-size: 30px;
          letter-spacing: -0.02em;
        }

        .obso-sub{
          margin-top: 8px;
          color: rgba(255,255,255,.65);
          font-size: 13px;
          line-height: 1.6;
        }

        .obso-hr{
          border:0;
          border-top: 1px solid rgba(255,255,255,.12);
          margin: 16px 0;
        }

        .obso-label{
          font-size: 12px;
          font-weight: 1000;
          letter-spacing: .12em;
          color: rgba(255,255,255,.70);
          margin: 10px 0 6px;
          text-transform: uppercase;
        }

        .obso-auth input{
          width: 100%;
          border-radius: 12px;
          padding: 12px 12px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(0,0,0,.28);
          color: rgba(255,255,255,.92);
          outline: none;
        }
        .obso-auth input::placeholder{
          color: rgba(255,255,255,.48);
          font-weight: 700;
        }
        .obso-auth input:focus{
          border-color: rgba(212,175,55,.45);
          box-shadow: 0 0 0 4px rgba(212,175,55,.12);
        }

        .obso-actions{
          display:flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
        }

        .obso-btnGold{
          flex: 1;
          min-width: 160px;
          padding: 12px 14px;
          background: #D4AF37 !important;
          border-color: #D4AF37 !important;
          color: #111 !important;
          font-weight: 1100;
        }

        .obso-btnGhost{
          flex: 1;
          min-width: 160px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.88);
          padding: 12px 14px;
        }
        .obso-btnGhost:hover{ border-color: rgba(212,175,55,.35); }

        .obso-note{
          margin-top: 12px;
          padding: 10px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.05);
          color: rgba(255,255,255,.62);
          font-size: 12px;
          font-weight: 800;
        }

        .obso-error{
          margin-top: 12px;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,80,120,.35);
          background: rgba(255,80,120,.10);
          color: rgba(255,255,255,.92);
          font-weight: 900;
        }

        .obso-miniFooter{
          text-align:center;
          margin-top: 14px;
          color: rgba(255,255,255,.50);
          font-size: 12px;
          font-weight: 800;
        }
      `}</style>

      <div className="container" style={{ maxWidth: 520, width: "100%" }}>
        <div className="obso-card">
          <div className="obso-topGlow" />

          <div className="obso-pad">
            <div className="obso-pill">
              <span style={{ color: "#D4AF37" }}>◆</span> OBSO • CUSTOMER
            </div>

            <h2 className="h2 obso-title">Giriş Yap</h2>
            <p className="p obso-sub">
              Sepeti tamamlamak için hesabına giriş yap. Ödeme sayfasına yönlendirileceksin.
            </p>

            <hr className="obso-hr" />

            <form onSubmit={submit}>
              <div className="obso-label">Username</div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
              />

              <div className="obso-label">Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
              />

              <div className="obso-actions">
                <button className="btn obso-btnGold" type="submit">
                  Giriş Yap
                </button>

                <Link to="/register" className="btn-ghost obso-btnGhost" style={{ textAlign: "center" }}>
                  Hesap Aç
                </Link>
              </div>
            </form>

            <div className="obso-note">
              🔒 Güvenli görünüm • Demo proje: giriş, checkout akışını göstermek için.
            </div>

            {error && <div className="obso-error">⚠️ {error}</div>}
          </div>
        </div>

        <div className="obso-miniFooter">
          © {new Date().getFullYear()} OBSO — Premium Experience
        </div>
      </div>
    </div>
  );
}
