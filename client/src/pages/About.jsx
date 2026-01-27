import { Link } from "react-router-dom";

export default function About() {
  const brand = "OBSO";

  const svgDataUri = (svg) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const FALLBACK_ART = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="860" height="520" viewBox="0 0 860 520">
    <defs>
      <linearGradient id="bg" x1="0" x2="1">
        <stop offset="0" stop-color="#0a0a0e"/>
        <stop offset=".6" stop-color="#10101a"/>
        <stop offset="1" stop-color="#0a0a0e"/>
      </linearGradient>
      <radialGradient id="glow" cx=".25" cy=".2" r=".9">
        <stop offset="0" stop-color="#D4AF37" stop-opacity=".35"/>
        <stop offset="1" stop-color="#D4AF37" stop-opacity="0"/>
      </radialGradient>
      <filter id="s" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="18" stdDeviation="14" flood-color="#000" flood-opacity=".35"/>
      </filter>
    </defs>

    <rect width="860" height="520" fill="url(#bg)"/>
    <circle cx="240" cy="130" r="240" fill="url(#glow)"/>
    <circle cx="720" cy="60" r="220" fill="url(#glow)" opacity=".45"/>

    <g filter="url(#s)">
      <path d="M540 90h70c14 0 26 12 26 26v30c0 12-10 22-22 22h-78c-12 0-22-10-22-22v-30c0-14 12-26 26-26z"
        fill="rgba(212,175,55,.85)"/>
      <path d="M500 180c8-22 26-36 52-36h108c26 0 44 14 52 36l26 90c18 64 20 110 10 176-8 52-42 90-90 104-20 6-44 8-62 8s-42-2-62-8c-48-14-82-52-90-104-10-66-8-112 10-176l26-90z"
        fill="rgba(255,255,255,.08)" stroke="rgba(212,175,55,.55)" stroke-width="2"/>
      <path d="M534 230h136c12 0 22 10 22 22v22c0 12-10 22-22 22H534c-12 0-22-10-22-22v-22c0-12 10-22 22-22z"
        fill="rgba(212,175,55,.12)" stroke="rgba(212,175,55,.35)"/>
      <text x="602" y="268" font-family="Arial, sans-serif" font-size="16" fill="rgba(212,175,55,.95)"
        text-anchor="middle" font-weight="700" letter-spacing=".16em">
        OBSO
      </text>
    </g>

    <path d="M54 420c120-54 280-70 410-40 60 14 106 36 132 62"
      fill="none" stroke="rgba(212,175,55,.22)" stroke-width="2"/>
  </svg>
  `);

  return (
    <div className="obso-about">
      <style>{`
        .obso-about{
          background:
            radial-gradient(1200px 700px at 20% -10%, rgba(212,175,55,.18), transparent 60%),
            radial-gradient(900px 600px at 95% 0%, rgba(120,170,255,.10), transparent 55%),
            linear-gradient(180deg, #07070a 0%, #0b0b10 50%, #08080b 100%);
          min-height: 100vh;
          padding: 22px 0;
        }
        .obso-card{
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,.14);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 18px 60px rgba(0,0,0,.35);
        }
        .obso-hero{
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(10,10,14,.94), rgba(18,18,26,.88) 55%, rgba(212,175,55,.16));
        }
        .obso-hero::before{
          content:"";
          position:absolute; inset:0;
          background:
            radial-gradient(520px 320px at 20% 25%, rgba(255,255,255,.10), transparent 60%),
            linear-gradient(90deg, rgba(212,175,55,.10), transparent 45%, rgba(212,175,55,.06));
          opacity: .95;
          pointer-events:none;
        }
        .obso-heroGrid{
          display:grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 14px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 980px){
          .obso-heroGrid{ grid-template-columns: 1fr; }
        }
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
          font-size: 38px;
          line-height: 1.08;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .obso-desc{ color: rgba(255,255,255,.74); max-width: 660px; }
        .obso-bars{ display:flex; gap:8px; margin-top: 12px; }
        .obso-bar{ height:6px; flex:1; border-radius:999px; }
        .obso-bar.a{ background: linear-gradient(90deg, rgba(212,175,55,.95), rgba(212,175,55,.18)); }
        .obso-bar.b{ background: linear-gradient(90deg, rgba(255,255,255,.55), rgba(255,255,255,.08)); }
        .obso-bar.c{ background: linear-gradient(90deg, rgba(120,170,255,.35), rgba(120,170,255,.08)); }
        .obso-art{
          width: 100%;
          max-width: 460px;
          margin-left: auto;
          filter: drop-shadow(0 18px 40px rgba(0,0,0,.55));
          opacity: .95;
          pointer-events:none;
        }
        .obso-btnGold{
          background: #D4AF37 !important;
          border-color: #D4AF37 !important;
          color: #111 !important;
          font-weight: 1000;
        }
        .obso-ghost{
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.88);
        }
        .obso-ghost:hover{ border-color: rgba(212,175,55,.35); }
        .obso-hr{
          border: 0;
          border-top: 1px solid rgba(255,255,255,.12);
          margin: 16px 0;
        }
        .obso-grid3{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 980px){
          .obso-grid3{ grid-template-columns: 1fr; }
        }
        .obso-gridStory{
          display:grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 12px;
        }
        @media (max-width: 980px){
          .obso-gridStory{ grid-template-columns: 1fr; }
        }
        .obso-h2{ color:#fff; margin:0; }
        .obso-p{ color: rgba(255,255,255,.70); }
        .obso-li{ color: rgba(255,255,255,.72); }
        .obso-faqRow{
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,.12);
        }
      `}</style>

      <div className="container" style={{ padding: "0 0" }}>
        {/* HERO */}
        <div className="card obso-card obso-hero">
          <div className="card-pad" style={{ padding: 18 }}>
            <div className="obso-heroGrid">
              {/* LEFT */}
              <div>
                <div className="obso-pill">
                  <span style={{ color: "#D4AF37" }}>◆</span> {brand}
                </div>

                <div style={{ height: 12 }} />

                <h1 className="h2 obso-title">
                  Koku dünyasında <br /> modern & premium deneyim ✨
                </h1>

                <div style={{ height: 10 }} />

                <p className="p obso-desc">
                  {brand}; seçilmiş parfümleri, hızlı teslimatı ve şık alışveriş deneyimiyle
                  kokuları daha kolay ulaşılır hale getiren modern bir e-commerce deneyimidir.
                </p>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                  {/* ✅ Linkler aynı */}
                  <Link to="/shop" className="btn obso-btnGold">
                    Mağazayı Keşfet
                  </Link>
                  <Link to="/register" className="btn-ghost obso-ghost">
                    Hesap Oluştur
                  </Link>
                </div>

                {/* bargello vibe bar */}
                <div className="obso-bars" aria-hidden="true">
                  <div className="obso-bar a" />
                  <div className="obso-bar b" />
                  <div className="obso-bar c" />
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <img
                  className="obso-art"
                  src={"/hero/about-perfume.png"}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_ART;
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="obso-hr" />

        {/* CARDS */}
        <div className="obso-grid3">
          <InfoCard
            title="💎 Premium Seçki"
            desc="Seçilmiş parfümler ve zamansız kokular tek yerde. Minimal ama güçlü bir koleksiyon."
          />
          <InfoCard
            title="🚚 Hızlı Teslimat"
            desc="Siparişler hızlı hazırlanır, özenli paketleme ile güvenle yola çıkar."
          />
          <InfoCard
            title="🔒 Güvenli Ödeme (Demo)"
            desc="Checkout sayfası demo ödeme alanıyla tasarlandı (kart verisi kaydedilmez)."
          />
        </div>

        <div style={{ height: 12 }} />

        {/* STORY */}
        <div className="obso-gridStory">
          <div className="card obso-card">
            <div className="card-pad">
              <h2 className="h2 obso-h2">Biz Kimiz?</h2>
              <p className="p obso-p" style={{ marginTop: 10 }}>
                Bu proje; React + Node.js + SQLite ile geliştirilen bir “Fragrance E-commerce” sitesidir.
                Müşteri tarafında mağaza deneyimi bulunur; Admin tarafında ise ürün ekleme/düzenleme/silme
                işlemleri yapılır.
              </p>

              <div style={{ height: 12 }} />
              <hr className="obso-hr" />

              <h2 className="h2 obso-h2">Misyonumuz</h2>
              <p className="p obso-p" style={{ marginTop: 10 }}>
                Kullanıcıların ürünleri kolayca bulduğu, şık şekilde sepete eklediği ve
                ödeme adımında problemsiz ilerlediği modern bir arayüz sunmak.
              </p>
            </div>
          </div>

          <div className="card obso-card">
            <div className="card-pad">
              <h2 className="h2 obso-h2">Neler Sunuyoruz?</h2>

              <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.9 }}>
                <li className="obso-li">Modern Shop sayfası</li>
                <li className="obso-li">Sepet + adet artır/azalt</li>
                <li className="obso-li">Checkout + ödeme formu</li>
                <li className="obso-li">Admin Panel (ürün yönetimi)</li>
                <li className="obso-li">Görsel yükleme + önizleme</li>
              </ul>

              <div style={{ height: 14 }} />

              {/* ✅ Link aynı */}
              <Link to="/shop" className="btn obso-btnGold" style={{ width: "100%", textAlign: "center" }}>
                Ürünleri Gör
              </Link>
            </div>
          </div>
        </div>

        <hr className="obso-hr" />

        {/* FAQ */}
        <div className="card obso-card">
          <div className="card-pad">
            <h2 className="h2 obso-h2">Sık Sorulan Sorular</h2>

            <div style={{ height: 10 }} />

            <Faq q="Ürünler gerçek mi?" a="Bu proje bir demo e-commerce projesidir. Ürünler admin panelden yönetilir." />
            <Faq q="Ödeme gerçek mi?" a="Hayır. Kart bilgileri demo amaçlıdır ve kaydedilmez." />
            <Faq q="Admin paneline kim girer?" a="Sadece admin kullanıcı adı/şifresi ile girilir. Müşteri tarafında görünmez." />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, desc }) {
  return (
    <div className="card obso-card">
      <div className="card-pad">
        <div style={{ fontWeight: 1000, color: "#fff" }}>{title}</div>
        <p className="p" style={{ marginTop: 8, color: "rgba(255,255,255,.70)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <div className="obso-faqRow">
      <div style={{ fontWeight: 1000, color: "#fff" }}>{q}</div>
      <div className="p" style={{ marginTop: 6, color: "rgba(255,255,255,.70)" }}>
        {a}
      </div>
    </div>
  );
}
