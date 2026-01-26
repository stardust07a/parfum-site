import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Hepsi");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch(" /api/products");
    const data = await res.json();
    setProducts(data);
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
    <div className="container" style={{ padding: "22px 0" }}>
      {/* HEADER */}
      <div
        className="card"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,.06), rgba(255,45,85,.10))",
          border: "1px solid #e5e7eb",
        }}
      >
        <div className="card-pad" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 800, letterSpacing: ".08em" }}>
              ADMIN • ÜRÜN YÖNETİMİ
            </div>
            <h1 className="h2" style={{ fontSize: 28, marginTop: 6 }}>
              Ürün Paneli
            </h1>
            <p className="p" style={{ marginTop: 6 }}>
              Ürün ekle, düzenle, sil — görseller dahil.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link to="/admin/products/new" className="btn">
              + Yeni Ürün Ekle
            </Link>
            <button className="btn-ghost" onClick={load}>
              Yenile
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: 12 }} />

      {/* KPI */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <div className="card"><div className="card-pad">
          <div className="p" style={{ fontSize: 12 }}>Toplam Ürün</div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>{products.length}</div>
        </div></div>
        <div className="card"><div className="card-pad">
          <div className="p" style={{ fontSize: 12 }}>Kategori</div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>{categories.length - 1}</div>
        </div></div>
        <div className="card"><div className="card-pad">
          <div className="p" style={{ fontSize: 12 }}>Liste</div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>{filtered.length}</div>
        </div></div>
      </div>

      <div className="hr" />

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          placeholder="Ürün / Marka / Kategori ara…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ minWidth: 260 }}
        />

        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div style={{ height: 12 }} />

      {/* Table */}
      <div className="card">
        <div className="card-pad" style={{ padding: 0 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  <th style={th}>Görsel</th>
                  <th style={th}>Ürün</th>
                  <th style={th}>Marka</th>
                  <th style={th}>Kategori</th>
                  <th style={th}>Fiyat</th>
                  <th style={th}>İşlem</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td style={td} colSpan={6}>Yükleniyor…</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td style={td} colSpan={6}>Ürün bulunamadı.</td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={td}>
                        {p.image ? (
                          <img
                            src={p.image}
                            alt="product"
                            style={{ width: 52, height: 52, borderRadius: 14, objectFit: "cover", border: "1px solid #e5e7eb" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 52,
                              height: 52,
                              borderRadius: 14,
                              border: "1px solid #e5e7eb",
                              background: "linear-gradient(135deg, rgba(0,0,0,.06), rgba(255,45,85,.12))",
                            }}
                          />
                        )}
                      </td>

                      <td style={td}>
                        <div style={{ fontWeight: 900 }}>{p.name}</div>
                        <div className="p" style={{ fontSize: 12 }}>ID: {p.id}</div>
                      </td>

                      <td style={td}>{p.brand}</td>
                      <td style={td}>{p.category}</td>
                      <td style={td}><b>{Number(p.price).toFixed(2)}₺</b></td>

                      <td style={td}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Link className="btn-ghost" to={`/admin/products/${p.id}/edit`}>
                            Düzenle
                          </Link>
                          <button
                            className="btn-ghost"
                            onClick={() => deleteProduct(p.id)}
                            style={{ borderColor: "#fecaca" }}
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
      </div>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "14px 14px",
  fontSize: 12,
  letterSpacing: ".06em",
  fontWeight: 900,
  color: "#111827",
  whiteSpace: "nowrap",
};

const td = {
  padding: "14px 14px",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
};
