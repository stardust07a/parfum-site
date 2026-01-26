import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const { addToCart } = useCart();

  // ✅ Slider
  const slides = useMemo(
    () => [
      {
        kicker: "✨ Premium Beauty Store",
        title: "Mağaza\nYeni Sezon",
        desc: "Trend ürünleri keşfet • Sepete ekle • Ödemeye geç",
        cta: "Sepete Git",
        to: "/cart",
        bg: "linear-gradient(135deg, rgba(0,0,0,.06), rgba(255,45,85,.16))",
      },
      {
        kicker: "🔥 Bestseller",
        title: "En Çok\nTercih Edilen",
        desc: "Güzellik seçkimizin en popüler ürünleri burada.",
        cta: "Hakkımızda",
        to: "/about",
        bg: "linear-gradient(135deg, rgba(0,0,0,.06), rgba(120,70,255,.16))",
      },
      {
        kicker: "💎 Luxury Look",
        title: "Modern\nAlışveriş",
        desc: "Şık tasarım • Hızlı sepet deneyimi • Premium UI",
        cta: "Hesap Oluştur",
        to: "/register",
        bg: "linear-gradient(135deg, rgba(0,0,0,.06), rgba(20,180,200,.16))",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setActive((p) => (p + 1) % slides.length);

  // ✅ Ürünler
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Filtreler
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [sort, setSort] = useState("new"); // new | priceAsc | priceDesc | name

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

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["Tümü", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      const matchCategory = category === "Tümü" ? true : p.category === category;

      const matchText =
        !q ||
        String(p.name || "").toLowerCase().includes(q) ||
        String(p.brand || "").toLowerCase().includes(q) ||
        String(p.category || "").toLowerCase().includes(q);

      return matchCategory && matchText;
    });
  }, [products, query, category]);

  const sorted = useMemo(() => {
    const list = [...filtered];

    if (sort === "priceAsc") {
      list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "priceDesc") {
      list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sort === "name") {
      list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    } else {
      // new: id DESC gibi düşün
      list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    }

    return list;
  }, [filtered, sort]);

  return (
    <div className="container" style={{ padding: "18px 0" }}>
      {/* HERO SLIDER */}
      <div
        className="card"
        style={{
          overflow: "hidden",
          border: "1px solid #e5e7eb",
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
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                  background: "rgba(255,255,255,.7)",
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
                  fontSize: 42,
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
                  Sepet
                </Link>
                <Link to="/" className="btn-ghost">
                  Anasayfa
                </Link>
              </div>

              <div style={{ height: 12 }} />
              <div className="hr" />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                <MiniBadge text="Premium Grid" />
                <MiniBadge text="Hızlı Sepet" />
              </div>
            </div>

            {/* RIGHT - slider controls */}
            <div className="card" style={{ background: "rgba(255,255,255,.75)" }}>
<div className="card-pad" style={{ padding: 12 }}>
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
                  <PromoRow label="Yeni" text="Glow Paletleri" />
                  <PromoRow label="Trend" text="Full Coverage" />
                  <PromoRow label="Favori" text="Mat Ruj Seçkisi" />
                </div>

                <div style={{ height: 14 }} />

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
                          border: "1px solid #e5e7eb",
                          background: i === active ? "var(--accent)" : "rgba(255,255,255,.8)",
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
                <Link to="/cart" className="btn-ghost" style={{ display: "inline-block" }}>
                  Sepete git →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={{ height: 14 }} />

      <div className="card">
        <div className="card-pad">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr .8fr .6fr",
              gap: 10,
              alignItems: "center",
            }}
          >
            <input
              placeholder="Ürün ara (isim / marka / kategori)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="new">Yeni Eklenen</option>
              <option value="priceAsc">Fiyat: Artan</option>
              <option value="priceDesc">Fiyat: Azalan</option>
              <option value="name">İsim: A → Z</option>
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span className="p" style={{ fontSize: 13 }}>
                {loading ? "Yükleniyor…" : `${sorted.length} ürün`}
              </span>
            </div>
          </div>

          <div style={{ height: 12 }} />

          {/* Categories */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {categories.slice(0, 10).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="btn-ghost"
                style={{
                  borderRadius: 999,
                  padding: "8px 12px",
                  fontWeight: 900,
                  background: category === c ? "rgba(255,45,85,.12)" : "#fafafa",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ height: 14 }} />

      <div className="card">
        <div className="card-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}>
            <div>
              <h2 className="h2" style={{ margin: 0 }}>Bizim Ürünler</h2>
              <p className="p" style={{ marginTop: 6 }}>
                 premium vitrin — ürünler daha lüks görünsün ✨
              </p>
            </div>
            <Link to="/cart" className="btn-ghost">Sepete Git →</Link>
          </div>

          <div style={{ height: 12 }} />

          {loading ? (
            <div className="p">Ürünler yükleniyor…</div>
          ) : sorted.length === 0 ? (
            <div className="p">Sonuç bulunamadı.</div>
          ) : (
<div
  className="grid"
  style={{
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
    gap: 5,
              }}
            >
              {sorted.map((p) => (
                <div key={p.id} className="card" style={{ overflow: "hidden" }}>
                  {/* ✅ 1024x1024 görsel görünümü: kare alan */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1", // ✅ kare (1024x1024 hissi)
                      background:
                        "linear-gradient(135deg, rgba(0,0,0,.06), rgba(255,45,85,.10))",
                      borderBottom: "1px solid #e5e7eb",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          
                          objectFit: "cover", // ✅ kare crop
                          display: "block",
                        }}
                      />
                    ) : (
                      <div style={{ fontWeight: 900, opacity: 0.8 }}>Görsel yok</div>
                    )}
                  </div>

                  <div className="card-pad">
                    <div style={{ fontWeight: 900, lineHeight: 1.15 }}>{p.name}</div>
                    <div className="p" style={{ fontSize: 13, marginTop: 4 }}>
                      {p.brand} • {p.category}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <div style={{ fontWeight: 900, fontSize: 16 }}>
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
            <Link to="/" className="btn-ghost">← Anasayfa</Link>
            <Link to="/checkout" className="btn">Ödemeye Geç</Link>
          </div>
        </div>
      </div>

      <div style={{ height: 14 }} />
      <div className="footer">© {new Date().getFullYear()} Thech Beauty</div>
    </div>
  );
}

function MiniBadge({ text }) {
  return (
    <span
      style={{
        padding: "7px 10px",
        borderRadius: 999,
        border: "1px solid #e5e7eb",
        background: "rgba(255,255,255,.7)",
        fontWeight: 900,
        fontSize: 12,
      }}
    >
      {text}
    </span>
  );
}

function PromoRow({ label, text }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
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
