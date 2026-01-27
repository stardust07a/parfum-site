import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Hepsi");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    // ✅ burada boşluk vardı: " /api/products" -> "/api/products"
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["Hepsi", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const s = `${p.name || ""} ${p.brand || ""} ${p.category || ""}`.toLowerCase();
      const okQ = s.includes(q.toLowerCase());
      const okC = cat === "Hepsi" ? true : p.category === cat;
      return okQ && okC;
    });
  }, [products, q, cat]);

  const deleteProduct = async (id) => {
    if (!confirm("Ürünü silmek istiyor musun?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="obso-admin">
      <style>{adminCss}</style>

      <div className="container" style={{ padding: "26px 0", maxWidth: 1120 }}>
        {/* HEADER */}
        <div className="obso-headerCard">
          <div className="obso-headerTop">
            <div>
              <div className="obso-pill">
                <span style={{ color: "#D4AF37" }}>◆</span> OBSO • ADMIN
              </div>

              <h1 className="h2 obso-title" style={{ marginTop: 10 }}>
                Ürün Paneli
              </h1>
              <p className="p obso-sub" style={{ marginTop: 6 }}>
                Ürün ekle • düzenle • sil — premium yönetim ekranı
              </p>
            </div>

            <div className="obso-headerActions">
              <Link to="/admin/products/new" className="btn obso-btnGold">
                + Yeni Ürün Ekle
              </Link>
              <button className="btn-ghost obso-btnGhost" onClick={load}>
                Yenile
              </button>
            </div>
          </div>

          <div className="obso-bars" aria-hidden="true">
            <div className="bar a" />
            <div className="bar b" />
            <div className="bar c" />
          </div>
        </div>

        <div style={{ height: 12 }} />

        {/* KPI */}
        <div className="obso-kpiGrid">
          <KpiCard label="Toplam Ürün" value={products.length} />
          <KpiCard label="Kategori" value={Math.max(0, categories.length - 1)} />
          <KpiCard label="Listelenen" value={filtered.length} />
        </div>

        <div style={{ height: 12 }} />

        {/* FILTER BAR */}
        <div className="obso-card">
          <div className="obso-cardPad">
            <div className="obso-filterTop">
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <div style={{ color: "#fff", fontWeight: 1100, fontSize: 16 }}>Filtreler</div>
                <div style={{ color: "rgba(255,255,255,.60)", fontWeight: 900, fontSize: 12 }}>
                  Arama + kategori
                </div>
              </div>

              <div className="obso-chip">
                {loading ? "Yükleniyor…" : `${filtered.length} sonuç`}
              </div>
            </div>

            <div style={{ height: 10 }} />

            <div className="obso-filterRow">
              <div className="obso-inputWrap">
                <span className="obso-icon" aria-hidden="true">⌕</span>
                <input
                  placeholder="Ürün / Marka / Kategori ara…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>

              <select value={cat} onChange={(e) => setCat(e.target.value)} className="obso-select">
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <button
                className="btn-ghost obso-btnGhost"
                onClick={() => {
                  setQ("");
                  setCat("Hepsi");
                }}
              >
                Sıfırla
              </button>
            </div>

            {/* Quick chips (opsiyonel ama çok güzel duruyor) */}
            <div className="obso-chipRow">
              {categories.slice(0, 8).map((c) => (
                <button
                  key={c}
                  className={`obso-chipBtn ${cat === c ? "active" : ""}`}
                  onClick={() => setCat(c)}
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 12 }} />

        {/* TABLE */}
        <div className="obso-card">
          <div className="obso-tableWrap">
            <table className="obso-table">
              <thead>
                <tr>
                  <th>Görsel</th>
                  <th>Ürün</th>
                  <th>Marka</th>
                  <th>Kategori</th>
                  <th>Stok</th>
                  <th>Fiyat</th>
                  <th style={{ textAlign: "right" }}>İşlem</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="obso-empty">
                      Yükleniyor…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="obso-empty">
                      Ürün bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="obso-row">
                      <td>
                        <div className="obso-img">
                          {p.image ? (
                            <img src={p.image} alt="product" />
                          ) : (
                            <div className="obso-imgPh" />
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="obso-name">{p.name}</div>
                        <div className="obso-muted">ID: {p.id}</div>
                      </td>

                      <td>
                        <div style={{ color: "rgba(255,255,255,.88)", fontWeight: 900 }}>
                          {p.brand || "-"}
                        </div>
                      </td>

                      <td>
                        <span className="obso-tag">{p.category || "-"}</span>
                      </td>

                      <td>
                        <span className={`obso-stock ${Number(p.stock) <= 0 ? "out" : ""}`}>
                          {Number(p.stock ?? 0)}
                        </span>
                      </td>

                      <td>
                        <div className="obso-price">{Number(p.price || 0).toFixed(2)}₺</div>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div className="obso-actions">
                          <Link className="btn-ghost obso-btnGhost" to={`/admin/products/${p.id}/edit`}>
                            Düzenle
                          </Link>
                          <button
                            className="btn-ghost obso-btnDanger"
                            onClick={() => deleteProduct(p.id)}
                          >
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="obso-footer">
          © {new Date().getFullYear()} OBSO — Admin Panel
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value }) {
  return (
    <div className="obso-card">
      <div className="obso-cardPad">
        <div style={{ color: "rgba(255,255,255,.60)", fontSize: 12, fontWeight: 900, letterSpacing: ".10em" }}>
          {label.toUpperCase()}
        </div>
        <div style={{ marginTop: 8, fontSize: 26, fontWeight: 1200, color: "#fff" }}>
          {value}
        </div>
        <div style={{ marginTop: 8, height: 6, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
          <div style={{ width: "60%", height: "100%", background: "linear-gradient(90deg, rgba(212,175,55,.90), rgba(120,170,255,.20))" }} />
        </div>
      </div>
    </div>
  );
}

const adminCss = `
  .obso-admin{
    background:
      radial-gradient(1200px 700px at 18% -10%, rgba(212,175,55,.18), transparent 60%),
      radial-gradient(900px 600px at 95% 0%, rgba(120,170,255,.10), transparent 55%),
      linear-gradient(180deg, #07070a 0%, #0b0b10 50%, #08080b 100%);
    min-height: 100vh;
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
  .obso-cardPad{ padding: 16px; }

  .obso-headerCard{
    border-radius: 22px;
    border: 1px solid rgba(212,175,55,.16);
    background:
      radial-gradient(900px 520px at 18% 10%, rgba(212,175,55,.18), transparent 58%),
      radial-gradient(700px 520px at 90% 0%, rgba(120,170,255,.10), transparent 55%),
      rgba(255,255,255,.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 18px 60px rgba(0,0,0,.35);
    padding: 16px;
  }
  .obso-headerTop{
    display:flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
    flex-wrap: wrap;
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
    width: fit-content;
  }
  .obso-title{ color:#fff; font-size: 34px; letter-spacing: -0.02em; }
  .obso-sub{ color: rgba(255,255,255,.65); font-size: 13px; line-height: 1.6; }

  .obso-headerActions{ display:flex; gap: 10px; flex-wrap: wrap; }

  .obso-btnGold{
    background: #D4AF37 !important;
    border-color: #D4AF37 !important;
    color: #111 !important;
    font-weight: 1100;
    padding: 12px 14px;
  }
  .obso-btnGhost{
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.06);
    color: rgba(255,255,255,.88);
    padding: 12px 14px;
  }
  .obso-btnGhost:hover{ border-color: rgba(212,175,55,.35); }

  .obso-btnDanger{
    border: 1px solid rgba(255,80,120,.35);
    background: rgba(255,80,120,.10);
    color: rgba(255,255,255,.90);
    padding: 12px 14px;
  }
  .obso-btnDanger:hover{ border-color: rgba(255,80,120,.55); }

  .obso-bars{ display:flex; gap:8px; margin-top: 14px; }
  .bar{ height: 7px; flex:1; border-radius:999px; }
  .bar.a{ background: linear-gradient(90deg, rgba(212,175,55,.95), rgba(212,175,55,.16)); }
  .bar.b{ background: linear-gradient(90deg, rgba(255,255,255,.50), rgba(255,255,255,.06)); }
  .bar.c{ background: linear-gradient(90deg, rgba(120,170,255,.32), rgba(120,170,255,.08)); }

  .obso-kpiGrid{
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  @media (max-width: 900px){
    .obso-kpiGrid{ grid-template-columns: 1fr; }
  }

  .obso-filterTop{
    display:flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
  }
  .obso-chip{
    display:inline-flex;
    align-items:center;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.05);
    color: rgba(255,255,255,.75);
    font-size: 12px;
    font-weight: 900;
  }

  .obso-filterRow{
    display:flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .obso-inputWrap{
    flex: 1;
    min-width: 260px;
    position: relative;
  }
  .obso-icon{
    position:absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    opacity: .75;
    color: rgba(255,255,255,.70);
    font-weight: 900;
  }

  .obso-admin input{
    width: 100%;
    border-radius: 12px;
    padding: 12px 12px 12px 34px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(0,0,0,.28);
    color: rgba(255,255,255,.92);
    outline: none;
  }
  .obso-admin input::placeholder{
    color: rgba(255,255,255,.48);
    font-weight: 700;
  }
  .obso-admin input:focus{
    border-color: rgba(212,175,55,.45);
    box-shadow: 0 0 0 4px rgba(212,175,55,.12);
  }

  .obso-select{
    border-radius: 12px;
    padding: 12px 12px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(0,0,0,.28);
    color: rgba(255,255,255,.90);
    outline: none;
    font-weight: 900;
    min-width: 180px;
  }
  .obso-select:focus{
    border-color: rgba(212,175,55,.45);
    box-shadow: 0 0 0 4px rgba(212,175,55,.12);
  }

  .obso-chipRow{
    display:flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .obso-chipBtn{
    padding: 8px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.05);
    color: rgba(255,255,255,.78);
    font-weight: 1000;
    font-size: 12px;
    cursor: pointer;
  }
  .obso-chipBtn:hover{ border-color: rgba(212,175,55,.35); color: rgba(255,255,255,.92); }
  .obso-chipBtn.active{
    border-color: rgba(212,175,55,.55);
    background: rgba(212,175,55,.10);
    color: #fff;
  }

  .obso-tableWrap{ overflow-x: auto; }
  .obso-table{
    width: 100%;
    border-collapse: collapse;
    min-width: 900px;
  }
  .obso-table thead th{
    text-align: left;
    padding: 14px 14px;
    font-size: 12px;
    letter-spacing: .10em;
    font-weight: 1100;
    color: rgba(255,255,255,.78);
    border-bottom: 1px solid rgba(255,255,255,.12);
    background: rgba(0,0,0,.22);
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .obso-table tbody td{
    padding: 14px 14px;
    border-top: 1px solid rgba(255,255,255,.10);
    color: rgba(255,255,255,.85);
    vertical-align: middle;
    white-space: nowrap;
  }

  .obso-row:hover{
    background: rgba(255,255,255,.04);
  }

  .obso-empty{
    padding: 22px 14px !important;
    color: rgba(255,255,255,.70) !important;
    font-weight: 900;
    text-align: center;
  }

  .obso-img{
    width: 54px;
    height: 54px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.04);
    display:grid;
    place-items:center;
  }
  .obso-img img{ width: 100%; height: 100%; object-fit: cover; }
  .obso-imgPh{
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,.06), rgba(212,175,55,.10));
  }

  .obso-name{
    font-weight: 1100;
    color: #fff;
  }
  .obso-muted{
    font-size: 12px;
    font-weight: 900;
    color: rgba(255,255,255,.55);
    margin-top: 4px;
  }

  .obso-tag{
    display:inline-flex;
    align-items:center;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(212,175,55,.22);
    background: rgba(212,175,55,.08);
    color: rgba(255,255,255,.88);
    font-weight: 1000;
    font-size: 12px;
  }

  .obso-stock{
    display:inline-flex;
    align-items:center;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.05);
    color: rgba(255,255,255,.90);
    font-weight: 1100;
    font-size: 12px;
  }
  .obso-stock.out{
    border-color: rgba(255,80,120,.35);
    background: rgba(255,80,120,.10);
  }

  .obso-price{
    font-weight: 1200;
    color: #D4AF37;
    letter-spacing: .01em;
  }

  .obso-actions{
    display:flex;
    justify-content: flex-end;
    gap: 8px;
    flex-wrap: wrap;
  }

  .obso-footer{
    text-align:center;
    margin-top: 14px;
    color: rgba(255,255,255,.50);
    font-size: 12px;
    font-weight: 800;
  }
`;
