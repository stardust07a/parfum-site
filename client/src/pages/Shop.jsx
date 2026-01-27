import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [sort, setSort] = useState("new"); // new | priceAsc | priceDesc | name

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products"); // ✅ boşluk yok
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

  const catCounts = useMemo(() => {
    const m = new Map();
    for (const p of products) {
      const c = p.category || "Diğer";
      m.set(c, (m.get(c) || 0) + 1);
    }
    return m;
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
    if (sort === "priceAsc") list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    else if (sort === "priceDesc") list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    else if (sort === "name") list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    else list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0)); // new
    return list;
  }, [filtered, sort]);

  const heroPick = useMemo(() => {
    // filtreye bağlı kalmadan ilk “iyi” görseli olan ürünü hero’da göster
    const withImg = products.find((p) => p?.image);
    return withImg || products[0] || null;
  }, [products]);

  const newArrivals = useMemo(() => {
    const list = [...products].sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    return list.slice(0, 6);
  }, [products]);

  const recommended = useMemo(() => {
    // basit öneri: stok yüksek + görsel var
    const list = [...products]
      .filter((p) => (p?.image ? true : false))
      .sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0));
    return list.slice(0, 6);
  }, [products]);

  const money = (n) => `${Number(n || 0).toFixed(2)}₺`;

  return (
    <div className="obsoShop">
      <style>{`


/* =========================
   OBSO THEME (GLOBAL)
   ========================= */

:root{
  --bg0:#07070a;
  --bg1:#0c0d12;

  --muted:rgba(243,244,246,.72);

  --line:rgba(255,255,255,.10);
  --line2:rgba(255,255,255,.14);

  --panel:rgba(255,255,255,.06);
  --panel2:rgba(255,255,255,.09);



  --radius: 22px;
  --radius2: 16px;

  --accent:#d6b35a;     /* gold */
  --accent2:#c9a227;    /* deeper gold */
  --accentSoft:rgba(214,179,90,.18);

}
      *{ box-sizing:border-box; }
html, body, #root{ min-height:100%; }

body{
  margin:0;
  color: var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
  background:
    radial-gradient(900px 520px at 12% 0%, rgba(214,179,90,.22), transparent 62%),
    radial-gradient(900px 520px at 88% 0%, rgba(77,120,255,.18), transparent 60%),
    linear-gradient(180deg, var(--bg0), var(--bg1));
  background-attachment: fixed;
}

a{ color:inherit; text-decoration:none; }
button{ font-family: inherit; }
img{ max-width:100%; display:block; }
/* =========================
   LAYOUT
   ========================= */
.container{
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
}

.grid{ display:grid; }

.hr{
  height:1px;
  background: var(--line);
  margin: 14px 0;
}

.footer{
  text-align:center;
  padding: 18px 0;
  color: var(--muted);
  font-size: 13px;
}

/* =========================
   CARDS / TYPO
   ========================= */
.card{
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
}

.card-pad{ padding: 18px; }

.h1, .h2{
  margin:0;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.h1{ font-size: 46px; line-height: 1.05; }
.h2{ font-size: 20px; line-height: 1.2; }

.p{
  margin:0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

/* =========================
   BUTTONS
   ========================= */
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.20);
  background: var(--accent);
  color: #0b0b0f;
  font-weight: 900;
  letter-spacing: .01em;
  cursor:pointer;
  transition: transform .15s ease, filter .15s ease, box-shadow .15s ease;
  box-shadow: 0 10px 24px rgba(0,0,0,.25);
}
.btn:hover{ transform: translateY(-1px); filter: brightness(1.03); }
.btn:active{ transform: translateY(0px); filter: brightness(.98); }

.btn-ghost{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--line2);
  background: rgba(255,255,255,.05);
  color: var(--text);
  font-weight: 900;
  cursor:pointer;
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}
.btn-ghost:hover{
  transform: translateY(-1px);
  background: rgba(255,255,255,.08);
  border-color: rgba(214,179,90,.35);
}
.btn-ghost:active{ transform: translateY(0px); }

/* =========================
   INPUTS / SELECT
   ========================= */
input, select{
  width: 100%;
  padding: 12px 12px;
  border-radius: 14px;
  border: 1px solid var(--line2);
  background: rgba(10,10,14,.55);
  color: var(--text);
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
}

input::placeholder{ color: rgba(243,244,246,.55); }

input:focus, select:focus{
  border-color: rgba(214,179,90,.55);
  box-shadow: 0 0 0 4px rgba(214,179,90,.12);
  background: rgba(10,10,14,.65);
}

/* =========================
   TABLE (ADMIN)
   ========================= */
table{ width:100%; border-collapse: collapse; }
thead tr{ background: rgba(255,255,255,.04); }
th, td{
  text-align:left;
  padding: 14px 14px;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}
th{
  font-size: 12px;
  letter-spacing: .08em;
  font-weight: 900;
  color: rgba(243,244,246,.85);
}
td{ color: rgba(243,244,246,.85); }

/* Pills / badges */
.pill{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(214,179,90,.22);
  background: rgba(214,179,90,.08);
  font-weight: 900;
  font-size: 12px;
}

/* =========================
   NAVBAR helper (senin className="nav-links" kullanıyorsun)
   ========================= */
.nav-links{
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
  padding: 0 0;
}

/* =========================
   PAGE WRAPPERS
   ========================= */
/* Shop/Home gibi sayfalar eğer kendi background basıyorsa kapat: */
.obsoShop,
.obsoHome,
.obsoPage{
  min-height: 100vh;
  background: transparent !important; /* ✅ renk farkını bitirir */
}

/* Responsive */
@media (max-width: 980px){
  .h1{ font-size: 38px; }
  .card-pad{ padding: 16px; }
}
@media (max-width: 700px){
  .container{ width: min(1180px, calc(100% - 28px)); }
  .h1{ font-size: 34px; }
}
  .obsoShop{
    --ink:#0b0b0f;
    --muted:#6b7280;
    --line:rgba(15, 15, 20, .10);
    --soft:rgba(15, 15, 20, .04);
    --paper:#ffffff;
    --gold:#c9a227;
    --shadow: 0 12px 28px rgba(0,0,0,.10);
    --shadow2: 0 10px 22px rgba(0,0,0,.08);

    min-height: 100vh;

    /* ✅ Sayfa genel arka plan (beyaz değil) */
    background:
      radial-gradient(1200px 560px at 12% 0%, rgba(201,162,39,.14), transparent 62%),
      radial-gradient(900px 420px at 88% 0%, rgba(10,10,14,.16), transparent 60%),
      linear-gradient(180deg, #f6f6f7, #eceef2);

    padding-bottom: 28px;
  }

  .obsoShop .wrap{
    padding: 18px 0;
  }

  .obsoShop .topbar{
    border: 1px solid var(--line);
    background: linear-gradient(180deg, #fff, #fff);
    border-radius: 18px;
    padding: 10px 12px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
    overflow:hidden;
    box-shadow: 0 10px 18px rgba(0,0,0,.06);
  }

  .obsoShop .topbar .left{
    display:flex;
    gap:10px;
    align-items:center;
    flex-wrap:wrap;
  }

  .obsoShop .pill{
    display:inline-flex;
    gap:8px;
    align-items:center;
    padding:8px 12px;
    border-radius:999px;
    border:1px solid var(--line);
    background: rgba(255,255,255,.92);
    font-weight:900;
    font-size:12px;
    letter-spacing:.06em;
    color: var(--ink);
  }

  .obsoShop .pill .dot{
    width:8px; height:8px; border-radius:999px;
    background: var(--gold);
    box-shadow: 0 0 0 4px rgba(201,162,39,.18);
  }

  .obsoShop .toplinks{
    display:flex; gap:10px; align-items:center; flex-wrap:wrap;
  }

  .obsoShop .hero{
    margin-top: 12px;
    border: 1px solid var(--line);
    border-radius: 22px;
    overflow:hidden;
    background:
      radial-gradient(1200px 400px at 20% 0%, rgba(201,162,39,.10), transparent 60%),
      radial-gradient(900px 360px at 85% 15%, rgba(0,0,0,.12), transparent 55%),
      linear-gradient(180deg, #fff, #fbfbfc);
    box-shadow: var(--shadow2);
  }

  .obsoShop .heroInner{
    display:grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 18px;
    padding: 22px;
    align-items:center;
  }

  .obsoShop .brand{
    font-weight: 1000;
    letter-spacing: .22em;
    font-size: 12px;
    color: var(--ink);
    opacity: .9;
  }

  .obsoShop .hTitle{
    margin: 10px 0 0;
    font-size: 46px;
    line-height: 1.04;
    color: var(--ink);
  }

  .obsoShop .lead{
    margin: 10px 0 0;
    max-width: 560px;
    color: #2a2a33;
    opacity: .9;
  }

  .obsoShop .ctaRow{
    margin-top: 16px;
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    align-items:center;
  }

  .obsoShop .luxBtn{
    background: var(--ink) !important;
    border-color: var(--ink) !important;
    color: #fff !important;
    border-radius: 14px !important;
    padding: 10px 14px !important;
    box-shadow: 0 10px 18px rgba(0,0,0,.14);
  }

  .obsoShop .ghostBtn{
    border-radius: 14px !important;
    padding: 10px 14px !important;
    border-color: var(--line) !important;
    background: rgba(255,255,255,.78) !important;
  }

  .obsoShop .heroRight{
    position:relative;
    border-radius: 18px;
    border: 1px solid rgba(201,162,39,.22);
    background:
      linear-gradient(135deg, rgba(15,15,20,.06), rgba(201,162,39,.10));
    overflow:hidden;
    min-height: 340px;
    display:grid;
    place-items:center;
  }

  .obsoShop .heroImg{
    width: 74%;
    height: 84%;
    object-fit: contain;
    filter: drop-shadow(0 18px 26px rgba(0,0,0,.18));
    transform: translateY(2px);
  }

  .obsoShop .heroBadge{
    position:absolute;
    left: 14px;
    top: 14px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,.92);
    border: 1px solid rgba(201,162,39,.28);
    font-weight: 1000;
    letter-spacing: .06em;
    font-size: 12px;
    color: var(--ink);
    display:flex;
    align-items:center;
    gap:8px;
  }

  .obsoShop .heroBadge .spark{
    color: var(--gold);
    font-weight: 1000;
  }

  .obsoShop .heroMeta{
    position:absolute;
    left: 14px;
    bottom: 14px;
    right: 14px;
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    align-items:center;
    justify-content:space-between;
    background: rgba(255,255,255,.86);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 10px 12px;
    box-shadow: 0 10px 18px rgba(0,0,0,.06);
  }

  .obsoShop .metaL{ min-width: 200px; }
  .obsoShop .metaName{
    font-weight: 1000;
    color: var(--ink);
    line-height:1.1;
  }
  .obsoShop .metaSub{
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
  }
  .obsoShop .metaR{
    display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  }
  .obsoShop .priceBig{
    font-weight: 1000;
    font-size: 18px;
    color: var(--ink);
  }
  .obsoShop .stockChip{
    font-size: 12px;
    font-weight: 1000;
    border: 1px solid var(--line);
    background: rgba(255,255,255,.92);
    padding: 6px 10px;
    border-radius: 999px;
    color: var(--ink);
  }

  .obsoShop .section{
    margin-top: 14px;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: var(--paper);
    overflow:hidden;
    box-shadow: 0 12px 24px rgba(0,0,0,.06);
  }

  .obsoShop .sectionHead{
    padding: 16px 16px 12px;
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    gap:12px;
    flex-wrap:wrap;
    border-bottom: 1px solid var(--line);
    background: linear-gradient(180deg, #fff, #fcfcfd);
  }

  .obsoShop .sectionTitle{
    margin:0;
    font-size: 18px;
    font-weight: 1000;
    color: var(--ink);
  }

  .obsoShop .sectionSub{
    margin:6px 0 0;
    color: var(--muted);
    font-size: 13px;
  }

  .obsoShop .layout{
    display:grid;
    grid-template-columns: 280px 1fr;
    gap: 12px;
    padding: 12px;
    align-items:start;
  }

  .obsoShop .sidebar{
    position: sticky;
    top: 86px;
    border: 1px solid var(--line);
    border-radius: 18px;
    background: linear-gradient(180deg, #fff, #fbfbfc);
    overflow:hidden;
    box-shadow: 0 10px 18px rgba(0,0,0,.06);
  }

  .obsoShop .sideHead{
    padding: 14px 14px 12px;
    border-bottom: 1px solid var(--line);
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    gap:10px;
  }

  .obsoShop .sideHead .t{
    font-weight: 1000;
    color: var(--ink);
  }
  .obsoShop .sideHead .n{
    color: var(--muted);
    font-size: 12px;
    font-weight: 900;
  }

  .obsoShop .catList{
    padding: 10px;
    display:grid;
    gap: 8px;
  }

  .obsoShop .catBtn{
    width: 100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid var(--line);
    background: rgba(255,255,255,.92);
    cursor:pointer;
    transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
    font-weight: 1000;
    color: var(--ink);
  }
  .obsoShop .catBtn:hover{
    transform: translateY(-1px);
    border-color: rgba(201,162,39,.35);
    box-shadow: 0 10px 18px rgba(0,0,0,.07);
  }
  .obsoShop .catBtnActive{
    border-color: rgba(201,162,39,.55);
    box-shadow: 0 10px 18px rgba(201,162,39,.12);
    background: linear-gradient(135deg, rgba(201,162,39,.12), rgba(0,0,0,.03));
  }
  .obsoShop .catCount{
    font-size: 12px;
    font-weight: 1000;
    color: var(--muted);
    border: 1px solid var(--line);
    background: rgba(255,255,255,.9);
    padding: 4px 8px;
    border-radius: 999px;
  }

  .obsoShop .controls{
    border: 1px solid var(--line);
    border-radius: 18px;
    background: linear-gradient(180deg, #fff, #fbfbfc);
    padding: 12px;
    display:grid;
    gap: 10px;
    box-shadow: 0 10px 18px rgba(0,0,0,.06);
  }

  .obsoShop .controlRow{
    display:grid;
    grid-template-columns: 1.2fr .7fr .5fr;
    gap: 10px;
    align-items:center;
  }

  .obsoShop .countText{
    text-align:right;
    color: var(--muted);
    font-weight: 900;
    font-size: 12px;
  }

  .obsoShop .gridProducts{
    margin-top: 10px;
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 12px;
  }

  .obsoShop .pCard{
    border: 1px solid var(--line);
    border-radius: 18px;
    overflow:hidden;
    background: #fff;
    box-shadow: 0 10px 18px rgba(0,0,0,.06);
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
  }

  .obsoShop .pCard:hover{
    transform: translateY(-2px);
    border-color: rgba(201,162,39,.35);
    box-shadow: 0 16px 28px rgba(0,0,0,.10);
  }

  .obsoShop .pMedia{
    width: 100%;
    aspect-ratio: 1 / 1;
    background:
      radial-gradient(700px 280px at 20% 10%, rgba(201,162,39,.12), transparent 60%),
      linear-gradient(135deg, rgba(15,15,20,.06), rgba(201,162,39,.06));
    border-bottom: 1px solid var(--line);
    display:grid;
    place-items:center;
    position:relative;
    overflow:hidden;
  }

  .obsoShop .pMedia img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display:block;
    transform: scale(1.02);
    transition: transform .22s ease;
  }
  .obsoShop .pCard:hover .pMedia img{
    transform: scale(1.06);
  }

  .obsoShop .tag{
    position:absolute;
    left: 12px;
    top: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(201,162,39,.35);
    background: rgba(255,255,255,.92);
    font-weight: 1000;
    font-size: 12px;
    color: var(--ink);
    display:flex;
    align-items:center;
    gap:8px;
  }
  .obsoShop .tag .mini{
    width:7px; height:7px; border-radius:999px; background: var(--gold);
  }

  .obsoShop .pBody{
    padding: 12px;
  }

  .obsoShop .pName{
    font-weight: 1000;
    color: var(--ink);
    line-height: 1.12;
  }

  .obsoShop .pSub{
    margin-top: 6px;
    font-size: 12px;
    color: var(--muted);
  }

  .obsoShop .pFoot{
    margin-top: 12px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
    flex-wrap:wrap;
  }

  .obsoShop .pPrice{
    font-weight: 1000;
    color: var(--ink);
    font-size: 16px;
  }

  .obsoShop .pStock{
    margin-top: 8px;
    font-size: 12px;
    color: var(--muted);
  }

  .obsoShop .luxSmallBtn{
    background: var(--ink) !important;
    border-color: var(--ink) !important;
    color: #fff !important;
    border-radius: 14px !important;
    padding: 8px 12px !important;
    box-shadow: 0 10px 16px rgba(0,0,0,.12);
  }

  .obsoShop .rowCards{
    padding: 12px;
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 12px;
  }

  .obsoShop .miniCard{
    border: 1px solid var(--line);
    border-radius: 18px;
    background: linear-gradient(180deg, #fff, #fbfbfc);
    overflow:hidden;
    box-shadow: 0 10px 18px rgba(0,0,0,.06);
  }

  .obsoShop .miniCard .inner{
    padding: 12px;
    display:grid;
    gap:10px;
  }

  .obsoShop .miniRow{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
  }

  .obsoShop .miniRow b{
    color: var(--ink);
  }

  .obsoShop .skeleton{
    background: linear-gradient(90deg, rgba(0,0,0,.06), rgba(0,0,0,.03), rgba(0,0,0,.06));
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
  }
  @keyframes shimmer{
    0%{ background-position: 200% 0; }
    100%{ background-position: -200% 0; }
  }

  @media (max-width: 920px){
    .obsoShop .heroInner{ grid-template-columns: 1fr; }
    .obsoShop .layout{ grid-template-columns: 1fr; }
    .obsoShop .sidebar{ position: static; top: auto; }
    .obsoShop .controlRow{ grid-template-columns: 1fr; }
    .obsoShop .countText{ text-align:left; }
  }
`}</style>


      <div className="container wrap">
        {/* TOP BAR (Bargello-style utility hissi) */}
        <div className="topbar">
          <div className="left">
            <span className="pill">
              <span className="dot" /> OBSO • Premium Parfüm Vitrini
            </span>
            <span className="pill" style={{ fontWeight: 900, letterSpacing: ".02em", opacity: 0.9 }}>
              Yeni ürünler • Sınırlı stok • Hızlı sepet
            </span>
          </div>

          <div className="toplinks">
            <Link to="/about" className="btn-ghost ghostBtn">Hakkımızda</Link>
            <Link to="/cart" className="btn luxBtn">Sepete Git</Link>
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="heroInner">
            <div>
              <div className="brand">OBSO</div>
              <h1 className="hTitle">
                Lüks Kokular,
                <br />
                Modern Vitrin.
              </h1>
              <p className="lead">
                Aradığın kokuyu hızlıca bul: filtrele • sırala • sepete ekle.
                Minimal tasarım, premium alışveriş hissi.
              </p>

              <div className="ctaRow">
                <Link to="/cart" className="btn luxBtn">Sepete Git</Link>
                <Link to="/register" className="btn-ghost ghostBtn">Hesap Oluştur</Link>
                <Link to="/" className="btn-ghost ghostBtn">Anasayfa</Link>
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span className="pill" style={{ letterSpacing: ".02em" }}>✨ Yeni Gelenler</span>
                <span className="pill" style={{ letterSpacing: ".02em" }}>💎 Önerilenler</span>
                <span className="pill" style={{ letterSpacing: ".02em" }}>🖤 Minimal UI</span>
              </div>
            </div>

            <div className="heroRight">
              <div className="heroBadge">
                <span className="spark">✦</span> Vitrin Seçimi
              </div>

              {heroPick?.image ? (
                <img className="heroImg" src={heroPick.image} alt={heroPick.name || "product"} />
              ) : (
                <div style={{ width: "78%", height: "78%", borderRadius: 18 }} className="skeleton" />
              )}

              <div className="heroMeta">
                <div className="metaL">
                  <div className="metaName">{heroPick?.name || "Ürünler yükleniyor…"}</div>
                  <div className="metaSub">
                    {heroPick ? `${heroPick.brand || "Marka"} • ${heroPick.category || "Kategori"}` : " "}
                  </div>
                </div>

                <div className="metaR">
                  <div className="priceBig">{heroPick ? money(heroPick.price) : " "}</div>
                  {heroPick && (
                    <span className="stockChip">Stok: {heroPick.stock ?? "-"}</span>
                  )}
                  <button
                    className="btn luxBtn"
                    style={{ padding: "10px 12px" }}
                    onClick={() => heroPick && addToCart(heroPick)}
                    disabled={!heroPick}
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEW ARRIVALS + RECOMMENDED (Bargello gibi “Noutati / Recomandari” hissi) */}
        <div className="section" style={{ marginTop: 12 }}>
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">Yeni Gelenler</h2>
              <p className="sectionSub">Son eklenen ürünlerden hızlı seçim yap.</p>
            </div>
            <Link to="/cart" className="btn-ghost ghostBtn">Sepet →</Link>
          </div>

          <div className="rowCards">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="pCard">
                  <div className="pMedia skeleton" />
                  <div className="pBody">
                    <div className="skeleton" style={{ height: 16, borderRadius: 8 }} />
                    <div className="skeleton" style={{ height: 12, marginTop: 10, borderRadius: 8, width: "70%" }} />
                    <div className="skeleton" style={{ height: 36, marginTop: 14, borderRadius: 12 }} />
                  </div>
                </div>
              ))
            ) : newArrivals.length === 0 ? (
              <div style={{ padding: 14, color: "var(--muted)", fontWeight: 900 }}>
                Henüz ürün yok. Admin panelden ürün ekleyebilirsin.
              </div>
            ) : (
              newArrivals.map((p) => (
                <div key={p.id} className="pCard">
                  <div className="pMedia">
                    <div className="tag"><span className="mini" /> NEW</div>
                    {p.image ? (
                      <img src={p.image} alt={p.name} />
                    ) : (
                      <div style={{ fontWeight: 1000, color: "rgba(0,0,0,.55)" }}>Görsel yok</div>
                    )}
                  </div>
                  <div className="pBody">
                    <div className="pName">{p.name}</div>
                    <div className="pSub">{p.brand} • {p.category}</div>

                    <div className="pFoot">
                      <div className="pPrice">{money(p.price)}</div>
                      <button className="btn luxSmallBtn" onClick={() => addToCart(p)}>
                        Sepete Ekle
                      </button>
                    </div>

                    <div className="pStock">Stok: <b>{p.stock}</b></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="section" style={{ marginTop: 12 }}>
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">Önerilenler</h2>
              <p className="sectionSub">Stokta olan, vitrinde iyi duran seçimler.</p>
            </div>
            <Link to="/about" className="btn-ghost ghostBtn">Marka →</Link>
          </div>

          <div className="rowCards">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="pCard">
                  <div className="pMedia skeleton" />
                  <div className="pBody">
                    <div className="skeleton" style={{ height: 16, borderRadius: 8 }} />
                    <div className="skeleton" style={{ height: 12, marginTop: 10, borderRadius: 8, width: "70%" }} />
                    <div className="skeleton" style={{ height: 36, marginTop: 14, borderRadius: 12 }} />
                  </div>
                </div>
              ))
            ) : (
              recommended.slice(0, 6).map((p) => (
                <div key={p.id} className="pCard">
                  <div className="pMedia">
                    <div className="tag"><span className="mini" /> PICK</div>
                    {p.image ? (
                      <img src={p.image} alt={p.name} />
                    ) : (
                      <div style={{ fontWeight: 1000, color: "rgba(0,0,0,.55)" }}>Görsel yok</div>
                    )}
                  </div>
                  <div className="pBody">
                    <div className="pName">{p.name}</div>
                    <div className="pSub">{p.brand} • {p.category}</div>

                    <div className="pFoot">
                      <div className="pPrice">{money(p.price)}</div>
                      <button className="btn luxSmallBtn" onClick={() => addToCart(p)}>
                        Sepete Ekle
                      </button>
                    </div>

                    <div className="pStock">Stok: <b>{p.stock}</b></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* MAIN SHOP (kategori + filtre + grid) */}
        <div className="section" style={{ marginTop: 12 }}>
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">Tüm Ürünler</h2>
              <p className="sectionSub">Kategoriden seç, arama yap, sıralayıp vitrini tamamla.</p>
            </div>
            <Link to="/checkout" className="btn luxBtn">Ödemeye Geç</Link>
          </div>

          <div className="layout">
            {/* SIDEBAR */}
            <aside className="sidebar">
              <div className="sideHead">
                <div className="t">Kategoriler</div>
                <div className="n">{products.length} ürün</div>
              </div>

              <div className="catList">
                {categories.map((c) => {
                  const active = category === c;
                  const count = c === "Tümü" ? products.length : (catCounts.get(c) || 0);
                  return (
                    <button
                      key={c}
                      className={`catBtn ${active ? "catBtnActive" : ""}`}
                      onClick={() => setCategory(c)}
                      type="button"
                    >
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {c}
                      </span>
                      <span className="catCount">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ padding: 12, borderTop: "1px solid var(--line)" }}>
                <div className="miniCard">
                  <div className="inner">
                    <div className="miniRow">
                      <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 900 }}>Hızlı Link</span>
                      <span style={{ color: "var(--gold)", fontWeight: 1000 }}>→</span>
                    </div>
                    <Link to="/cart" className="btn-ghost ghostBtn" style={{ display: "block", textAlign: "center" }}>
                      Sepeti Gör
                    </Link>
                    <Link to="/register" className="btn luxBtn" style={{ display: "block", textAlign: "center" }}>
                      Hesap Oluştur
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* CONTENT */}
            <div>
              <div className="controls">
                <div className="controlRow">
                  <input
                    placeholder="Ürün / Marka / Kategori ara…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="new">Yeni Eklenen</option>
                    <option value="priceAsc">Fiyat: Artan</option>
                    <option value="priceDesc">Fiyat: Azalan</option>
                    <option value="name">İsim: A → Z</option>
                  </select>

                  <div className="countText">
                    {loading ? "Yükleniyor…" : `${sorted.length} ürün`}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <span className="pill" style={{ letterSpacing: ".02em" }}>
                    <span className="dot" /> Premium görünüm
                  </span>
                  <span className="pill" style={{ letterSpacing: ".02em" }}>
                    <span className="dot" /> Hızlı filtre
                  </span>
                  <span className="pill" style={{ letterSpacing: ".02em" }}>
                    <span className="dot" /> Kare görsel vitrin
                  </span>
                </div>
              </div>

              <div className="gridProducts">
                {loading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="pCard">
                      <div className="pMedia skeleton" />
                      <div className="pBody">
                        <div className="skeleton" style={{ height: 16, borderRadius: 8 }} />
                        <div className="skeleton" style={{ height: 12, marginTop: 10, borderRadius: 8, width: "70%" }} />
                        <div className="skeleton" style={{ height: 36, marginTop: 14, borderRadius: 12 }} />
                      </div>
                    </div>
                  ))
                ) : sorted.length === 0 ? (
                  <div style={{ padding: 14, color: "var(--muted)", fontWeight: 900 }}>
                    Sonuç bulunamadı.
                  </div>
                ) : (
                  sorted.map((p) => (
                    <div key={p.id} className="pCard">
                      <div className="pMedia">
                        <div className="tag"><span className="mini" /> OBSO</div>
                        {p.image ? (
                          <img src={p.image} alt={p.name} />
                        ) : (
                          <div style={{ fontWeight: 1000, color: "rgba(0,0,0,.55)" }}>Görsel yok</div>
                        )}
                      </div>

                      <div className="pBody">
                        <div className="pName">{p.name}</div>
                        <div className="pSub">{p.brand} • {p.category}</div>

                        <div className="pFoot">
                          <div className="pPrice">{money(p.price)}</div>
                          <button className="btn luxSmallBtn" onClick={() => addToCart(p)}>
                            Sepete Ekle
                          </button>
                        </div>

                        <div className="pStock">
                          Stok: <b>{p.stock}</b>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link to="/" className="btn-ghost ghostBtn">← Anasayfa</Link>
                <Link to="/cart" className="btn luxBtn">Sepete Git</Link>
                <Link to="/checkout" className="btn-ghost ghostBtn">Checkout →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 14, color: "var(--muted)", textAlign: "center", padding: "18px 0" }}>
          © {new Date().getFullYear()} OBSO — Premium Parfüm Vitrini
        </div>
      </div>
    </div>
  );
}
