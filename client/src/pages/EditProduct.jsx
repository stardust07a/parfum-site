import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(10);

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setName(data?.name || "");
        setBrand(data?.brand || "");
        setCategory(data?.category || "");
        setPrice(data?.price ?? "");
        setStock(data?.stock ?? 0);

        setImage(data?.image || "");
        setPreview(data?.image || "");
      } catch (e) {
        setError("Ürün getirilemedi.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const onPickFile = (file) => {
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert("Görsel çok büyük! Lütfen 1.5MB altı yükle.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !brand || !category || !price) {
      return setError("Lütfen tüm alanları doldur.");
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        brand,
        category,
        price: Number(price),
        stock: Number(stock),
        image,
      }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || "Güncelleme başarısız");

    navigate("/admin/products");
  };

  if (loading) {
    return (
      <div className="obso-admin">
        <style>{adminCss}</style>
        <div className="container" style={{ padding: "26px 0" }}>
          <div className="obso-card" style={{ padding: 16, color: "rgba(255,255,255,.75)", fontWeight: 900 }}>
            Yükleniyor…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="obso-admin">
      <style>{adminCss}</style>

      <div className="container" style={{ padding: "26px 0", maxWidth: 1040 }}>
        {/* TOP BAR */}
        <div className="obso-top">
          <div>
            <div className="obso-pill">
              <span style={{ color: "#D4AF37" }}>◆</span> OBSO • ADMIN
            </div>
            <h1 className="h2 obso-title">Ürün Düzenle</h1>
            <p className="p obso-sub">Lüks düzenleme • Görsel + stok • ID: <b style={{ color: "#fff" }}>{id}</b></p>
          </div>

          <Link to="/admin/products" className="btn-ghost obso-btnGhost">
            ← Ürünlere dön
          </Link>
        </div>

        <hr className="obso-hr" />

        <div className="obso-grid">
          {/* FORM */}
          <div className="obso-card">
            <div className="card-pad">
              <div className="obso-sectionHead">
                <h2 className="h2" style={{ margin: 0, color: "#fff" }}>Ürün Bilgileri</h2>
                <span className="obso-chip">Edit Mode</span>
              </div>

              <form onSubmit={submit} style={{ marginTop: 12 }}>
                <div className="obso-block">
                  <div className="obso-grid2">
                    <div>
                      <div className="obso-label">Ürün Adı</div>
                      <input
                        placeholder="Ürün Adı"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="obso-label">Marka</div>
                      <input
                        placeholder="Marka"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ height: 10 }} />

                  <div className="obso-grid3">
                    <div>
                      <div className="obso-label">Kategori</div>
                      <input
                        placeholder="Kategori"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="obso-label">Fiyat (₺)</div>
                      <input
                        placeholder="Fiyat (₺)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="obso-label">Stok</div>
                      <input
                        type="number"
                        placeholder="Stok"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ height: 16 }} />

                <div className="obso-sectionHead">
                  <h2 className="h2" style={{ margin: 0, color: "#fff" }}>Görsel</h2>
                  <span className="obso-chip">PNG/JPG • 1.5MB</span>
                </div>

                <div className="obso-block" style={{ marginTop: 12 }}>
                  <p className="p" style={{ margin: 0, color: "rgba(255,255,255,.62)", fontSize: 13 }}>
                    Dosya yükle veya URL gir.
                  </p>

                  <div style={{ height: 10 }} />

                  <div className="obso-actions">
                    <label className="btn obso-btnGold" style={{ cursor: "pointer" }}>
                      Görsel Yükle
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => onPickFile(e.target.files?.[0])}
                      />
                    </label>

                    <button
                      type="button"
                      className="btn-ghost obso-btnGhost"
                      onClick={() => {
                        setImage("");
                        setPreview("");
                      }}
                    >
                      Kaldır
                    </button>
                  </div>

                  <div style={{ height: 10 }} />

                  <div>
                    <div className="obso-label">Görsel URL (opsiyonel)</div>
                    <input
                      placeholder="Görsel URL (opsiyonel)"
                      value={image.startsWith("data:") ? "" : image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setPreview(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {error && <div className="obso-error">⚠️ {error}</div>}

                <div style={{ height: 14 }} />
                <button className="btn obso-btnGold" type="submit" style={{ width: "100%" }}>
                  Güncellemeyi Kaydet
                </button>

                <div className="obso-note">
                  * Demo admin düzenleme: veriler API üzerinden güncellenir.
                </div>
              </form>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="obso-previewSticky">
            <div className="obso-card">
              <div className="card-pad">
                <div className="obso-sectionHead">
                  <h2 className="h2" style={{ margin: 0, color: "#fff" }}>Önizleme</h2>
                  <span className="obso-chip">Live</span>
                </div>

                <div style={{ height: 12 }} />

                <div className="obso-previewBox">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ opacity: 0.85, fontWeight: 1000, color: "rgba(255,255,255,.70)" }}>
                      Görsel yok
                    </div>
                  )}
                </div>

                <div style={{ height: 12 }} />
                <div style={{ fontWeight: 1100, fontSize: 16, color: "#fff" }}>
                  {name || "Ürün adı"}
                </div>
                <div className="p" style={{ fontSize: 12, color: "rgba(255,255,255,.62)", fontWeight: 900 }}>
                  {brand || "Marka"} • {category || "Kategori"}
                </div>

                <div className="obso-miniRow">
                  <div style={{ fontWeight: 1100, color: "#fff" }}>
                    {price ? `${price}₺` : "0₺"}
                  </div>
                  <div className="obso-badge">
                    Stok: {stock}
                  </div>
                </div>

                <div className="obso-bars" aria-hidden="true">
                  <div className="obso-bar a" />
                  <div className="obso-bar b" />
                  <div className="obso-bar c" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="obso-footer">
          © {new Date().getFullYear()} OBSO — Admin Panel
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

  .obso-top{
    display:flex;
    align-items: end;
    justify-content: space-between;
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
  }

  .obso-title{
    margin: 10px 0 0;
    color: #fff;
    font-size: 34px;
    letter-spacing: -0.02em;
  }

  .obso-sub{
    margin-top: 6px;
    color: rgba(255,255,255,.65);
    font-size: 13px;
    line-height: 1.6;
  }

  .obso-hr{
    border:0;
    border-top: 1px solid rgba(255,255,255,.12);
    margin: 16px 0;
  }

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

  .obso-grid{
    display:grid;
    grid-template-columns: 1fr 420px;
    gap: 14px;
    align-items: start;
  }
  @media (max-width: 1050px){
    .obso-grid{ grid-template-columns: 1fr; }
  }

  .obso-previewSticky{
    position: sticky;
    top: 90px;
  }
  @media (max-width: 1050px){
    .obso-previewSticky{ position: static; top:auto; }
  }

  .obso-sectionHead{
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

  .obso-block{
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 18px;
    padding: 12px;
    background: rgba(255,255,255,.04);
  }

  .obso-grid2{
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 720px){
    .obso-grid2{ grid-template-columns: 1fr; }
  }

  .obso-grid3{
    display:grid;
    grid-template-columns: 1.2fr .9fr .7fr;
    gap: 10px;
  }
  @media (max-width: 720px){
    .obso-grid3{ grid-template-columns: 1fr; }
  }

  .obso-label{
    font-size: 12px;
    font-weight: 1000;
    letter-spacing: .12em;
    color: rgba(255,255,255,.70);
    margin: 0 0 6px;
    text-transform: uppercase;
  }

  .obso-admin input{
    width: 100%;
    border-radius: 12px;
    padding: 12px 12px;
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

  .obso-actions{
    display:flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 8px;
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
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    color: rgba(255,255,255,.62);
    font-size: 12px;
    font-weight: 800;
  }

  .obso-previewBox{
    width: 100%;
    height: 340px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.12);
    overflow:hidden;
    background:
      radial-gradient(240px 140px at 30% 25%, rgba(255,255,255,.10), transparent 60%),
      linear-gradient(135deg, rgba(255,255,255,.06), rgba(212,175,55,.10));
    display:grid;
    place-items:center;
  }

  .obso-miniRow{
    display:flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .obso-badge{
    font-size: 12px;
    font-weight: 1000;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.06);
    color: rgba(255,255,255,.85);
  }

  .obso-bars{ display:flex; gap:8px; margin-top: 12px; }
  .obso-bar{ height:6px; flex:1; border-radius:999px; }
  .obso-bar.a{ background: linear-gradient(90deg, rgba(212,175,55,.95), rgba(212,175,55,.16)); }
  .obso-bar.b{ background: linear-gradient(90deg, rgba(255,255,255,.50), rgba(255,255,255,.06)); }
  .obso-bar.c{ background: linear-gradient(90deg, rgba(120,170,255,.32), rgba(120,170,255,.08)); }

  .obso-footer{
    text-align:center;
    margin-top: 14px;
    color: rgba(255,255,255,.50);
    font-size: 12px;
    font-weight: 800;
  }
`;
