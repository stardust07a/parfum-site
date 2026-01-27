import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !username || !email || !phone || !password) {
      return setError("Lütfen tüm alanları doldur.");
    }
    if (password !== password2) {
      return setError("Şifreler aynı değil.");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        fullName,
        email,
        phone,
      }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || "Kayıt başarısız");

    navigate("/login");
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
              <div className="obso-leftTitle">Hesabını Oluştur</div>
              <div className="obso-leftDesc">
                Premium vitrine katıl • hızlı alışveriş • lüks deneyim.
              </div>

              <div className="obso-bars" aria-hidden="true">
                <div className="bar a" />
                <div className="bar b" />
                <div className="bar c" />
              </div>
            </div>

            <div className="obso-feats">
              <Feat title="Hızlı Kayıt" desc="Bilgilerini gir, hesabın anında oluşsun." />
              <Feat title="Modern Arayüz" desc="Bargello vibe • altın vurgu • cam efekt." />
              <Feat title="Demo Güvenliği" desc="Bu proje demo amaçlıdır." />
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
                  <span style={{ color: "#D4AF37" }}>◆</span> KAYIT
                </div>

                <h2 className="h2 obso-title">Hesap Oluştur</h2>
                <p className="p obso-sub">
                  Üyeliğini oluştur ve alışverişe başla.
                </p>

                <hr className="obso-hr" />

                <form onSubmit={submit}>
                  <div className="obso-grid2">
                    <div>
                      <div className="obso-label">Ad Soyad</div>
                      <input
                        placeholder="Ad Soyad"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <div className="obso-label">Kullanıcı Adı</div>
                      <input
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  <div style={{ height: 10 }} />

                  <div className="obso-grid2">
                    <div>
                      <div className="obso-label">E-posta</div>
                      <input
                        placeholder="E-posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <div className="obso-label">Telefon</div>
                      <div className="obso-phone">
                        <div className="obso-code">+90</div>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                          inputMode="numeric"
                          placeholder="5XXXXXXXXX"
                          maxLength={10}
                          required
                          style={{ paddingLeft: 12 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 10 }} />

                  <div className="obso-grid2">
                    <div>
                      <div className="obso-label">Şifre</div>
                      <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                    </div>

                    <div>
                      <div className="obso-label">Şifre Tekrar</div>
                      <input
                        type="password"
                        placeholder="Şifre Tekrar"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <div style={{ height: 14 }} />

                  <button className="btn obso-btnGold" type="submit" style={{ width: "100%" }}>
                    Hesap Oluştur
                  </button>

                  <div className="obso-note">
                    Zaten hesabın var mı?{" "}
                    <Link to="/login" className="obso-miniLink">
                      Giriş Yap
                    </Link>
                  </div>

                  {error && <div className="obso-error">⚠️ {error}</div>}
                </form>

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
    min-height: 560px;
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

  .obso-grid2{
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 520px){
    .obso-grid2{ grid-template-columns: 1fr; }
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

  .obso-phone{
    display:flex;
    align-items:center;
    gap: 8px;
  }
  .obso-code{
    padding: 12px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.06);
    color: rgba(255,255,255,.88);
    font-weight: 1100;
    min-width: 58px;
    text-align:center;
  }

  .obso-btnGold{
    padding: 12px 14px;
    background: #D4AF37 !important;
    border-color: #D4AF37 !important;
    color: #111 !important;
    font-weight: 1100;
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
    color: rgba(255,255,255,.78);
    font-size: 12px;
    font-weight: 900;
    text-decoration: none;
    border-bottom: 1px solid rgba(212,175,55,.22);
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
