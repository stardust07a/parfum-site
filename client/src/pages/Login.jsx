import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Giriş başarısız");

      // ✅ Admin ise panele gönder
      if (data.user.role === "admin") {
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        navigate("/admin/products");
        return;
      }

      // ✅ Müşteri ise mağazaya gönder
      localStorage.setItem("customerUser", JSON.stringify(data.user));
      navigate("/shop");
    } catch (e) {
      setError("Server hatası");
    }
  };

  return (
    <div className="obso-auth">
      <style>{authCss}</style>

      <div className="container" style={{ width: "100%" }}>
        <div className="obso-shell">
          {/* LEFT BRAND PANEL */}
          <div className="obso-left">
            <div className="obso-leftTop">
              <div className="obso-brandPill">
                <span className="obso-dot" /> OBSO
              </div>
              <div className="obso-leftTitle">Premium Parfüm Deneyimi</div>
              <div className="obso-leftDesc">
                Seçilmiş koleksiyon • hızlı alışveriş • modern vitrin.
              </div>

              <div className="obso-bars" aria-hidden="true">
                <div className="bar a" />
                <div className="bar b" />
                <div className="bar c" />
              </div>
            </div>

            <div className="obso-feats">
              <Feat title="Güvenli Akış" desc="Demo proje: şifre saklanmaz, akış simülasyonu." />
              <Feat title="Hızlı Checkout" desc="Giriş sonrası mağazaya veya admin panele yönlendirme." />
              <Feat title="Lüks Arayüz" desc="Bargello vibe • altın vurgu • cam efekt." />
            </div>

            <div className="obso-leftFoot">
              © {new Date().getFullYear()} OBSO — Luxury Experience
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="obso-right">
            <div className="obso-card">
              <div className="obso-topGlow" />

              <div className="obso-pad">
                <div className="obso-pill">
                  <span style={{ color: "#D4AF37" }}>◆</span> GİRİŞ
                </div>

                <h2 className="h2 obso-title">Hesabına giriş yap</h2>
                <p className="p obso-sub">
                  Admin isen panele, müşteriysen mağazaya yönlendirilirsin.
                </p>

                <hr className="obso-hr" />

                <form onSubmit={submit}>
                  <div className="obso-label">Kullanıcı adı</div>
                  <input
                    placeholder="Kullanıcı adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />

                  <div className="obso-label">Şifre</div>
                  <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <div className="obso-actions">
                    <button className="btn obso-btnGold" type="submit">
                      Giriş Yap
                    </button>

                    <Link
                      to="/register"
                      className="btn-ghost obso-btnGhost"
                      style={{ textAlign: "center" }}
                    >
                      Hesap Oluştur
                    </Link>
                  </div>
                </form>

                {error && <div className="obso-error">⚠️ {error}</div>}

                <div className="obso-note">
                  İpucu: Admin rolü ile giriş yaparsan direkt admin panele geçer.
                </div>

                <div className="obso-miniLinks">
                  <Link to="/" className="obso-miniLink">← Anasayfa</Link>
                  <Link to="/shop" className="obso-miniLink">Mağaza</Link>
                  <Link to="/about" className="obso-miniLink">Hakkımızda</Link>
                </div>
              </div>
            </div>

            <div className="obso-mobileFooter">
              © {new Date().getFullYear()} OBSO — Luxury Experience
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feat({ title, desc }) {
  return (
    <div className="obso-feat">
      <div className="obso-featTitle">{title}</div>
      <div className="obso-featDesc">{desc}</div>
    </div>
  );
}

const authCss = `
  .obso-auth{
    background:
      radial-gradient(1200px 700px at 18% -10%, rgba(212,175,55,.18), transparent 60%),
      radial-gradient(900px 600px at 95% 0%, rgba(120,170,255,.10), transparent 55%),
      linear-gradient(180deg, #07070a 0%, #0b0b10 50%, #08080b 100%);
    min-height: 100vh;
    display:flex;
    align-items:center;
    padding: 28px 0;
  }

  .obso-shell{
    display:grid;
    grid-template-columns: 1.15fr .85fr;
    gap: 14px;
    align-items: stretch;
    max-width: 1100px;
    margin: 0 auto;
  }

  @media (max-width: 980px){
    .obso-shell{ grid-template-columns: 1fr; }
  }

  /* LEFT */
  .obso-left{
    border-radius: 22px;
    border: 1px solid rgba(212,175,55,.14);
    background:
      radial-gradient(900px 520px at 18% 10%, rgba(212,175,55,.18), transparent 58%),
      radial-gradient(700px 520px at 90% 0%, rgba(120,170,255,.10), transparent 55%),
      rgba(255,255,255,.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 18px 60px rgba(0,0,0,.35);
    overflow:hidden;
    padding: 18px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 520px;
  }

  .obso-brandPill{
    display:inline-flex;
    align-items:center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(0,0,0,.20);
    color: rgba(255,255,255,.88);
    font-weight: 1000;
    letter-spacing: .16em;
    font-size: 12px;
    width: fit-content;
  }
  .obso-dot{
    width: 9px; height: 9px; border-radius: 999px;
    background: #D4AF37;
    box-shadow: 0 0 0 6px rgba(212,175,55,.10);
  }

  .obso-leftTitle{
    margin-top: 14px;
    color: #fff;
    font-size: 34px;
    font-weight: 1100;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }
  .obso-leftDesc{
    margin-top: 10px;
    color: rgba(255,255,255,.68);
    font-size: 14px;
    line-height: 1.6;
    max-width: 520px;
  }

  .obso-bars{ display:flex; gap:8px; margin-top: 14px; }
  .bar{ height: 7px; flex:1; border-radius:999px; }
  .bar.a{ background: linear-gradient(90deg, rgba(212,175,55,.95), rgba(212,175,55,.16)); }
  .bar.b{ background: linear-gradient(90deg, rgba(255,255,255,.50), rgba(255,255,255,.06)); }
  .bar.c{ background: linear-gradient(90deg, rgba(120,170,255,.32), rgba(120,170,255,.08)); }

  .obso-feats{
    margin-top: 16px;
    display:grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .obso-feat{
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    padding: 12px;
  }
  .obso-featTitle{
    color:#fff;
    font-weight: 1100;
  }
  .obso-featDesc{
    margin-top: 6px;
    color: rgba(255,255,255,.62);
    font-size: 13px;
    line-height: 1.5;
    font-weight: 800;
  }

  .obso-leftFoot{
    margin-top: 14px;
    color: rgba(255,255,255,.50);
    font-size: 12px;
    font-weight: 800;
  }

  /* RIGHT */
  .obso-right{
    display:flex;
    flex-direction: column;
    gap: 12px;
  }

  .obso-card{
    border-radius: 22px;
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

  .obso-pad{ padding: 18px; }

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

  .obso-error{
    margin-top: 12px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255,80,120,.35);
    background: rgba(255,80,120,.10);
    color: rgba(255,255,255,.92);
    font-weight: 900;
  }

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

  .obso-miniLinks{
    display:flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 12px;
  }
  .obso-miniLink{
    color: rgba(255,255,255,.70);
    font-size: 12px;
    font-weight: 900;
    text-decoration: none;
    border-bottom: 1px solid rgba(212,175,55,.20);
    padding-bottom: 2px;
  }
  .obso-miniLink:hover{
    color: rgba(255,255,255,.92);
    border-bottom-color: rgba(212,175,55,.45);
  }

  .obso-mobileFooter{
    display:none;
    text-align:center;
    color: rgba(255,255,255,.50);
    font-size: 12px;
    font-weight: 800;
    padding-bottom: 6px;
  }

  @media (max-width: 980px){
    .obso-left{ display:none; }
    .obso-mobileFooter{ display:block; }
  }
`;
