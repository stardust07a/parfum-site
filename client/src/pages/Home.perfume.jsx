import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { addToCart } = useCart();

  // ✅ Slider içerikleri (linkler/route'lar aynı kaldı)
  const slides = useMemo(
    () => [
      {
        kicker: "✨ Signature Fragrance House",
        title: "Yeni Sezon\nNiş Koku Seçkisi",
        desc: "En yeni kokuları keşfet • sepete ekle • ödeme adımında tamamla.",
        cta: "Mağazaya Git",
        to: "/shop",
        bg: "linear-gradient(135deg, rgba(0,0,0,.08), rgba(184,138,59,.18))",
      },
      {
        kicker: "🔥 Limited Batch",
        title: "Bestseller\nEDP Koleksiyonu",
        desc: "En çok tercih edilen kokular şimdi vitrin bölümünde.",
        cta: "Ürünleri Gör",
        to: "/shop",
        bg: "linear-gradient(135deg, rgba(0,0,0,.10), rgba(32,95,70,.14))",
      },
      {
        kicker: "💎 Luxury Sillage",
        title: "Koku\nRutinin",
        desc: "Minimal tasarım, premium alışveriş deneyimi.",
        cta: "Hesap Oluştur",
        to: "/register",
        bg: "linear-gradient(135deg, rgba(0,0,0,.12), rgba(120,70,255,.10))",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  // ✅ Otomatik kaydırma
  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setActive((p) => (p + 1) % slides.length);

  // ✅ Ürünleri çek (backend aynı)
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

  // Home’da 8 ürün gösterelim
  const homeProducts = products.slice(0, 8);

  // Kategoriler (chip)
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(set).slice(0, 8);
  }, [products]);

  return (
    <div className="container" style={{ padding: "18px 0" }}>
      {/* HERO SLIDER */}
      <div
        className="card"
        style={{
          overflow: "hidden",
          border: "1px solid var(--line)",
          background: slides[active].bg,
          position: "relative",
        }}
      >
        <div className="card-pad" style={{ padding: 18 }}>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1.1fr .9fr",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* LEFT */}
            <div>
              <div
                className="badge"
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: "1px solid var(--line)",
                  background: "rgba(255,255,255,.75)",
                  fontWeight: 900,
                  letterSpacing: ".04em",
                }}
              >
                {slides[active].kicker}
              </div>

              <div style={{ height: 12 }} />

              <h1
                className="h1"
                style={{
                  fontSize: 44,
                  lineHeight: 1.05,
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {slides[active].title}
              </h1>

              <div style={{ height: 10 }} />

              <p className="p" style={{ maxWidth: 520, margin: 0 }}>
                {slides[active].desc}
              </p>

              <div style={{ height: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link to={slides[active].to} className="btn">
                  {slides[active].cta}
                </Link>
                <Link to="/cart" className="btn-ghost">
                  Sepeti Gör
                </Link>
                <Link to="/about" className="btn-ghost">
                  Hakkımızda
                </Link>
              </div>

              <div style={{ height: 14 }} />
              <div className="hr" />

              {/* mini kpi */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <Kpi title="Hızlı Alışveriş" desc="Keşfet • sepete ekle" />
                <Kpi title="Premium Seçki" desc="Özenle seçilmiş kokular" />
                <Kpi title="Modern Vitrin" desc="Niş parfüm UI" />
              </div>
            </div>

            {/* RIGHT - vitrin kartı */}
            <div className="card" style={{ background: "rgba(255,255,255,.78)" }}>
              <div className="card-pad">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h2 className="h2" style={{ margin: 0 }}>
                    Vitrin
                  </h2>
                  <span className="p" style={{ fontSize: 13 }}>
                    Slider
                  </span>
                </div>

                <div style={{ height: 12 }} />

                <div style={{ display: "grid", gap: 10 }}>
                  <PromoRow label="Bestseller" text="Woody Amber" />
                  <PromoRow label="Yeni Sezon" text="Fresh Citrus" />
                  <PromoRow label="Niş" text="Powdery Musk" />
                </div>

                <div style={{ height: 14 }} />

                {/* Controls */}
                <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
                  <button className="btn-ghost" onClick={prev}>
                    ←
                  </button>

                  <div style={{ display: "flex", gap: 6 }}>
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 999,
                          border: "1px solid var(--line)",
                          background: i === active ? "var(--accent)" : "rgba(255,255,255,.85)",
                          cursor: "pointer",
                        }}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button className="btn-ghost" onClick={next}>
                    →
                  </button>
                </div>

                <div style={{ height: 10 }} />
                <Link to="/shop" className="btn-ghost" style={{ display: "inline-block" }}>
                  Tüm ürünleri gör →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <>
          <div style={{ height: 14 }} />
          <div className="card">
            <div className="card-pad">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h2 className="h2" style={{ margin: 0 }}>
                  Popüler Kategoriler
                </h2>
                <span className="p" style={{ fontSize: 13 }}>Hızlı keşfet</span>
              </div>

              <div style={{ height: 10 }} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {categories.map((c) => (
                  <span
                    key={c}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: "1px solid var(--line)",
                      background: "rgba(255,255,255,.78)",
                      fontWeight: 900,
                      fontSize: 13,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* PRODUCTS */}
      <div style={{ height: 14 }} />
      <div className="card">
        <div className="card-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <div>
              <h2 className="h2" style={{ margin: 0 }}>Bizim Ürünler</h2>
              <p className="p" style={{ marginTop: 6 }}>
                En yeni eklenen ürünlerden seçtik ✨
              </p>
            </div>

            <Link to="/shop" className="btn-ghost">
              Mağazaya git →
            </Link>
          </div>

          <div style={{ height: 12 }} />

          {loading ? (
            <div className="p">Ürünler yükleniyor…</div>
          ) : homeProducts.length === 0 ? (
            <div className="p">Henüz ürün yok. Admin panelden ürün ekleyebilirsin.</div>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {homeProducts.map((p) => (
                <div key={p.id} className="card" style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      height: 170,
                      background:
                        "linear-gradient(135deg, rgba(0,0,0,.10), rgba(184,138,59,.14))",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : null}
                  </div>

                  <div className="card-pad">
                    <div style={{ fontWeight: 900 }}>{p.name}</div>
                    <div className="p" style={{ fontSize: 13 }}>
                      {p.brand} • {p.category}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                      <div style={{ fontWeight: 900 }}>
                        {Number(p.price).toFixed(2)}₺
                      </div>
                      <button className="btn" onClick={() => addToCart(p)}>
                        Sepete Ekle
                      </button>
                    </div>

                    <div className="p" style={{ fontSize: 12, marginTop: 8 }}>
                      Stok: <b>{p.stock}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ height: 12 }} />
          <div className="hr" />

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/shop" className="btn">
              Alışverişe Başla
            </Link>
            <Link to="/register" className="btn-ghost">
              Hesap oluştur
            </Link>
          </div>
        </div>
      </div>

      <div style={{ height: 14 }} />
      <div className="footer">© {new Date().getFullYear()} Thech Parfum</div>
    </div>
  );
}

function Kpi({ title, desc }) {
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: 16,
        padding: 12,
        background: "rgba(255,255,255,.78)",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 14 }}>{title}</div>
      <div className="p" style={{ fontSize: 13, marginTop: 4 }}>
        {desc}
      </div>
    </div>
  );
}

function PromoRow({ label, text }) {
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: 14,
        padding: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,.86)",
      }}
    >
      <div>
        <div style={{ fontWeight: 900 }}>{text}</div>
        <div className="p" style={{ fontSize: 13 }}>
          <span style={{ color: "var(--accent)", fontWeight: 900 }}>{label}</span>
        </div>
      </div>
      <div style={{ fontWeight: 900 }}>→</div>
    </div>
  );
}
