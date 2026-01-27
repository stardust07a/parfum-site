import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { addToCart } = useCart();

  // ✅ SLIDES (mantık aynı, tasarım farklı)
  const slides = useMemo(
    () => [
      {
        kicker: "◆ OBSO EXCLUSIVE",
        title: "İkonik\nParfüm Seçkisi",
        desc: "Seçilmiş kokular • premium alışveriş • hızlı checkout deneyimi.",
        cta: "Koleksiyonu Keşfet",
        to: "/shop",
        bg: "radial-gradient(900px 600px at 18% 15%, rgba(212,175,55,.26), transparent 60%), radial-gradient(700px 520px at 90% 10%, rgba(120,170,255,.14), transparent 55%), linear-gradient(135deg, rgba(8,8,12,1), rgba(14,14,22,1))",
        accent: "rgba(212,175,55,.95)",
        sub: "Luxury Fragrance",
      },
      {
        kicker: "◆ LIMITED DROPS",
        title: "Çok Satan\nKokular",
        desc: "En çok tercih edilen notalar şimdi vitrin bölümünde.",
        cta: "Ürünleri Gör",
        to: "/shop",
        bg: "radial-gradient(900px 600px at 22% 12%, rgba(255,255,255,.12), transparent 60%), radial-gradient(700px 520px at 90% 10%, rgba(212,175,55,.18), transparent 55%), linear-gradient(135deg, rgba(8,8,12,1), rgba(16,16,26,1))",
        accent: "rgba(255,255,255,.75)",
        sub: "Best Sellers",
      },
      {
        kicker: "◆ SIGNATURE",
        title: "Günlük & Özel\nGün Kokuları",
        desc: "Zamansız, modern ve güçlü bir koku gardırobu kur.",
        cta: "Hesap Oluştur",
        to: "/register",
        bg: "radial-gradient(900px 600px at 18% 15%, rgba(169,129,107,.26), transparent 60%), radial-gradient(700px 520px at 90% 10%, rgba(212,175,55,.18), transparent 55%), linear-gradient(135deg, rgba(8,8,12,1), rgba(14,14,22,1))",
        accent: "rgba(169,129,107,.95)",
        sub: "Everyday & Occasion",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  // ✅ Otomatik kaydırma (aynı)
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setActive((p) => (p + 1) % slides.length);

  // ✅ Ürünleri çek (aynı)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const homeProducts = products.slice(0, 8);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(set).slice(0, 10);
  }, [products]);

  // ✅ Hero art (optional png varsa onu kullan, yoksa SVG fallback)
  const svgDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const HERO_ART = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="920" height="720" viewBox="0 0 920 720">
    <defs>
      <linearGradient id="g1" x1="0" x2="1">
        <stop offset="0" stop-color="#0a0a0e"/>
        <stop offset=".55" stop-color="#11111a"/>
        <stop offset="1" stop-color="#0a0a0e"/>
      </linearGradient>
      <radialGradient id="gl" cx=".34" cy=".22" r=".8">
        <stop offset="0" stop-color="#D4AF37" stop-opacity=".35"/>
        <stop offset="1" stop-color="#D4AF37" stop-opacity="0"/>
      </radialGradient>
      <filter id="s" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="24" stdDeviation="18" flood-color="#000" flood-opacity=".45"/>
      </filter>
    </defs>
    <rect width="920" height="720" fill="url(#g1)"/>
    <circle cx="270" cy="160" r="300" fill="url(#gl)"/>
    <circle cx="820" cy="90" r="260" fill="url(#gl)" opacity=".45"/>

    <g filter="url(#s)">
      <path d="M540 110h80c16 0 30 14 30 30v34c0 14-12 26-26 26H536c-14 0-26-12-26-26v-34c0-16 14-30 30-30z"
        fill="rgba(212,175,55,.88)"/>
      <path d="M496 220c10-30 34-48 68-48h120c34 0 58 18 68 48l30 108c20 72 22 126 10 200-10 60-48 104-106 120-22 6-48 10-72 10s-50-4-72-10c-58-16-96-60-106-120-12-74-10-128 10-200l30-108z"
        fill="rgba(255,255,255,.08)" stroke="rgba(212,175,55,.55)" stroke-width="2"/>
      <path d="M540 292h148c14 0 26 12 26 26v26c0 14-12 26-26 26H540c-14 0-26-12-26-26v-26c0-14 12-26 26-26z"
        fill="rgba(212,175,55,.12)" stroke="rgba(212,175,55,.35)"/>
      <text x="614" y="338" font-family="Arial, sans-serif" font-size="16" fill="rgba(212,175,55,.95)"
        text-anchor="middle" font-weight="700" letter-spacing=".16em">
        OBSO
      </text>
    </g>

    <path d="M90 590c140-70 330-90 470-50 70 20 122 46 150 78"
      fill="none" stroke="rgba(212,175,55,.18)" stroke-width="2"/>
  </svg>
  `);

  return (
    <div className="obso-home">
      <style>{`
        .obso-home{
          background:
            radial-gradient(1200px 700px at 18% -10%, rgba(212,175,55,.18), transparent 60%),
            radial-gradient(900px 600px at 95% 0%, rgba(120,170,255,.10), transparent 55%),
            linear-gradient(180deg, #07070a 0%, #0b0b10 50%, #08080b 100%);
          min-height: 100vh;
          padding: 18px 0 26px;
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
        .obso-hr{
          border:0;
          border-top: 1px solid rgba(255,255,255,.12);
          margin: 16px 0;
        }

        /* HERO */
        .hero{
          position: relative;
          overflow: hidden;
        }
        .heroBg{
          position:absolute;
          inset:0;
          background: ${slides[active].bg};
          opacity: 1;
        }
        .heroPattern{
          position:absolute;
          inset:0;
          background:
            radial-gradient(2px 2px at 20px 20px, rgba(255,255,255,.10) 30%, transparent 32%) 0 0/36px 36px,
            radial-gradient(2px 2px at 20px 20px, rgba(212,175,55,.12) 30%, transparent 32%) 18px 18px/36px 36px;
          opacity:.55;
          pointer-events:none;
        }
        .heroInner{
          position: relative;
          z-index: 1;
          padding: 18px;
        }
        .heroGrid{
          display:grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 14px;
          align-items: center;
        }
        @media (max-width: 980px){
          .heroGrid{ grid-template-columns: 1fr; }
        }

        .pill{
          display:inline-flex;
          align-items:center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(212,175,55,.22);
          background: rgba(0,0,0,.25);
          color: rgba(255,255,255,.88);
          font-weight: 1000;
          letter-spacing: .14em;
          font-size: 12px;
        }
        .kickerDot{
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: ${slides[active].accent};
          box-shadow: 0 0 0 6px rgba(212,175,55,.10);
        }
        .heroTitle{
          margin: 12px 0 0;
          font-size: 46px;
          line-height: 1.03;
          letter-spacing: -0.03em;
          color: #fff;
          white-space: pre-line;
        }
        @media (max-width: 980px){
          .heroTitle{ font-size: 40px; }
        }
        .heroDesc{
          margin-top: 10px;
          color: rgba(255,255,255,.68);
          max-width: 560px;
          font-size: 14px;
          line-height: 1.6;
        }

        .bars{ display:flex; gap:8px; margin-top: 14px; }
        .bar{ height: 7px; flex:1; border-radius:999px; }
        .bar.a{ background: linear-gradient(90deg, rgba(212,175,55,.95), rgba(212,175,55,.16)); }
        .bar.b{ background: linear-gradient(90deg, rgba(255,255,255,.50), rgba(255,255,255,.06)); }
        .bar.c{ background: linear-gradient(90deg, rgba(120,170,255,.32), rgba(120,170,255,.08)); }

        .heroBtns{
          display:flex;
          gap:10px;
          flex-wrap: wrap;
          margin-top: 14px;
        }
        .btnGold{
          background: #D4AF37 !important;
          border-color: #D4AF37 !important;
          color: #111 !important;
          font-weight: 1000;
        }
        .btnGhost{
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.88);
        }
        .btnGhost:hover{ border-color: rgba(212,175,55,.35); }

        .heroRight{
          display:grid;
          gap: 12px;
          justify-items: end;
        }
        .artWrap{
          width: min(520px, 100%);
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          overflow:hidden;
          position: relative;
        }
        .artTop{
          display:flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 12px 12px 0;
        }
        .artTop h3{
          margin:0;
          color:#fff;
          font-size: 16px;
          font-weight: 1000;
        }
        .artTop span{
          color: rgba(255,255,255,.60);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .08em;
        }
        .artImg{
          width: 100%;
          height: 320px;
          object-fit: cover;
          display:block;
          opacity: .96;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,.55));
        }
        @media (max-width: 980px){
          .heroRight{ justify-items: start; }
          .artWrap{ width: 100%; }
          .artImg{ height: 280px; }
        }

        .heroNav{
          width: min(520px, 100%);
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap: 10px;
        }
        .dots{ display:flex; gap: 7px; align-items:center; }
        .dotBtn{
          width: 10px; height: 10px; border-radius: 999px;
          border: 1px solid rgba(212,175,55,.28);
          background: rgba(255,255,255,.12);
          cursor:pointer;
        }
        .dotBtn.active{
          background: #D4AF37;
          box-shadow: 0 0 0 6px rgba(212,175,55,.10);
        }
        .navBtn{
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.90);
          border-radius: 999px;
          padding: 8px 12px;
          cursor:pointer;
          font-weight: 1000;
        }
        .navBtn:hover{ border-color: rgba(212,175,55,.35); }

        /* KPI STRIP */
        .kpiStrip{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 14px;
        }
        @media (max-width: 980px){
          .kpiStrip{ grid-template-columns: 1fr; }
        }
        .kpi{
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 18px;
          padding: 12px;
          background: rgba(255,255,255,.05);
        }
        .kpi b{ color:#fff; font-weight: 1100; }
        .kpi p{ margin: 6px 0 0; color: rgba(255,255,255,.64); font-size: 13px; }

        /* CATEGORIES */
        .catCard{
          border-radius: 20px;
          border: 1px solid rgba(212,175,55,.14);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 14px;
        }
        .catRow{
          display:flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .chip{
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(212,175,55,.18);
          background: rgba(212,175,55,.08);
          color: rgba(255,255,255,.88);
          font-weight: 1000;
          font-size: 13px;
        }

        /* PRODUCTS */
        .sectionHead{
          display:flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sectionHead h2{ margin:0; color:#fff; }
        .sectionHead p{ margin:6px 0 0; color: rgba(255,255,255,.65); }
        .gridP{
          display:grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 12px;
        }
        @media (max-width: 1100px){
          .gridP{ grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px){
          .gridP{ grid-template-columns: 1fr; }
        }

        .pCard{
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.05);
          overflow:hidden;
          transition: transform .18s ease, border-color .18s ease;
        }
        .pCard:hover{
          transform: translateY(-3px);
          border-color: rgba(212,175,55,.22);
        }
        .pImg{
          height: 210px;
          background:
            radial-gradient(240px 140px at 30% 25%, rgba(255,255,255,.10), transparent 60%),
            linear-gradient(135deg, rgba(255,255,255,.06), rgba(212,175,55,.10));
          border-bottom: 1px solid rgba(255,255,255,.10);
          display:grid;
          place-items:center;
        }
        .pImg img{
          width: 70%;
          height: 82%;
          object-fit: contain;
          filter: drop-shadow(0 10px 18px rgba(0,0,0,.45));
        }
        .pPad{ padding: 12px; }
        .pName{ color:#fff; font-weight: 1100; }
        .pMeta{ color: rgba(255,255,255,.62); font-size: 12px; margin-top: 4px; font-weight: 800; }
        .pBottom{
          display:flex;
          justify-content: space-between;
          align-items:center;
          gap: 10px;
          margin-top: 12px;
        }
        .pPrice{ color:#fff; font-weight: 1100; font-size: 18px; }
        .pStock{ color: rgba(255,255,255,.62); font-size: 12px; margin-top: 8px; font-weight: 800; }

        .footer{
          margin-top: 16px;
          text-align: center;
          color: rgba(255,255,255,.50);
          font-size: 12px;
          padding: 14px 0;
        }
      `}</style>

      <div className="container" style={{ padding: "0 0" }}>
        {/* HERO (tamamen farklı layout) */}
        <div className="obso-card hero">
          <div className="heroBg" />
          <div className="heroPattern" />

          <div className="heroInner">
            <div className="heroGrid">
              {/* LEFT */}
              <div>
                <div className="pill">
                  <span className="kickerDot" />
                  {slides[active].kicker}
                  <span style={{ marginLeft: 6, opacity: 0.7 }}>{slides[active].sub}</span>
                </div>

                <h1 className="heroTitle">{slides[active].title}</h1>
                <p className="heroDesc">{slides[active].desc}</p>

                <div className="heroBtns">
                  <Link to={slides[active].to} className="btn btnGold">
                    {slides[active].cta}
                  </Link>
                  <Link to="/cart" className="btn-ghost btnGhost">
                    Sepeti Gör
                  </Link>
                  <Link to="/about" className="btn-ghost btnGhost">
                    Hakkımızda
                  </Link>
                </div>

                <div className="bars" aria-hidden="true">
                  <div className="bar a" />
                  <div className="bar b" />
                  <div className="bar c" />
                </div>

                {/* KPI strip */}
                <div className="kpiStrip">
                  <div className="kpi">
                    <b>Hızlı Alışveriş</b>
                    <p>Keşfet • sepete ekle • ödeme adımında bitir.</p>
                  </div>
                  <div className="kpi">
                    <b>Premium Seçim</b>
                    <p>Özenle seçilmiş kokular, modern vitrin.</p>
                  </div>
                  <div className="kpi">
                    <b>Lüks Deneyim</b>
                    <p>Minimal, güçlü ve “high-end” görünüm.</p>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="heroRight">
                <div className="artWrap">
                  <div className="artTop">
                    <h3>OBSO Showcase</h3>
                    <span>CURATED</span>
                  </div>

                  <img
                    className="artImg"
                    src={"/hero/home-perfume.png"}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = HERO_ART;
                    }}
                  />
                </div>

                <div className="heroNav">
                  <button className="navBtn" onClick={prev} aria-label="Prev">
                    ←
                  </button>

                  <div className="dots">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        className={`dotBtn ${i === active ? "active" : ""}`}
                        onClick={() => setActive(i)}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button className="navBtn" onClick={next} aria-label="Next">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        {categories.length > 0 && (
          <>
            <div style={{ height: 14 }} />
            <div className="catCard">
              <div className="sectionHead">
                <div>
                  <h2 className="h2">Parfüm Kategorileri</h2>
                  <p className="p">Hızlı keşfet • vitrini daralt</p>
                </div>
                <Link to="/shop" className="btn-ghost btnGhost">
                  Mağazaya git →
                </Link>
              </div>

              <div style={{ height: 10 }} />
              <div className="catRow">
                {categories.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* PRODUCTS */}
        <div style={{ height: 14 }} />
        <div className="obso-card">
          <div className="card-pad">
            <div className="sectionHead">
              <div>
                <h2 className="h2">Öne Çıkan Parfümler</h2>
                <p className="p">En yeni eklenen parfümlerden seçtik ✨</p>
              </div>
              <Link to="/shop" className="btn-ghost btnGhost">
                Tüm ürünler →
              </Link>
            </div>

            {loading ? (
              <div className="p" style={{ color: "rgba(255,255,255,.65)", marginTop: 12 }}>
                Parfümler yükleniyor…
              </div>
            ) : homeProducts.length === 0 ? (
              <div className="p" style={{ color: "rgba(255,255,255,.65)", marginTop: 12 }}>
                Henüz parfüm yok. Admin panelden parfüm ekleyebilirsin.
              </div>
            ) : (
              <div className="gridP">
                {homeProducts.map((p) => (
                  <div key={p.id} className="pCard">
                    <div className="pImg">
                      {p.image ? (
                        <img src={p.image} alt={p.name} />
                      ) : (
                        <div style={{ color: "rgba(212,175,55,.9)", fontWeight: 1100 }}>✦</div>
                      )}
                    </div>

                    <div className="pPad">
                      <div className="pName">{p.name}</div>
                      <div className="pMeta">
                        {p.brand} • {p.category}
                      </div>

                      <div className="pBottom">
                        <div className="pPrice">
                          {Number(p.price || 0).toFixed(2)}₺
                        </div>
                        <button className="btn btnGold" onClick={() => addToCart(p)}>
                          Sepete Ekle
                        </button>
                      </div>

                      <div className="pStock">
                        Stok: <b style={{ color: "#fff" }}>{p.stock}</b>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <hr className="obso-hr" />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/shop" className="btn btnGold">
                Alışverişe Başla
              </Link>
              <Link to="/register" className="btn-ghost btnGhost">
                Hesap oluştur
              </Link>
            </div>
          </div>
        </div>

        <div className="footer">
          © {new Date().getFullYear()} OBSO — Premium Parfüm Koleksiyonu
        </div>
      </div>
    </div>
  );
}
