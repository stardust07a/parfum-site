import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(10);

  const [image, setImage] = useState(""); // base64 veya url
  const [preview, setPreview] = useState("");

  const [error, setError] = useState("");

  const onPickFile = (file) => {
    if (!file) return;

    // ✅ 1.5MB üstü dosya engel
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Görsel çok büyük! Lütfen 1.5MB altı yükle.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result); // base64 dataURL
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ basit validasyon
    if (!name || !brand || !category || !price) {
      return setError("Lütfen tüm alanları doldur.");
    }
    if (Number(price) <= 0) {
      return setError("Fiyat 0'dan büyük olmalı.");
    }
    if (Number(stock) < 0) {
      return setError("Stok 0'dan küçük olamaz.");
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ stock eklendi
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
      if (!res.ok) return setError(data.error || "Ekleme başarısız");

      navigate("/admin/products");
    } catch (err) {
      setError("Sunucu hatası: ürün eklenemedi.");
    }
  };

  const clearImage = () => {
    setImage("");
    setPreview("");
  };

  const priceNumber = Number(price || 0);
  const hasPreview = Boolean(preview);

  return (
    <div className="obso-admin-add">
      <style>{`
        .obso-admin-add{
          background:
            radial-gradient(1200px 700px at 18% -10%, rgba(212,175,55,.18), transparent 60%),
            radial-gradient(900px 600px at 95% 0%, rgba(120,170,255,.10), transparent 55%),
            linear-gradient(180deg, #07070a 0%, #0b0b10 50%, #08080b 100%);
          min-height: 100vh;
          padding: 22px 0;
        }
        .obso-wrap{ max-width: 980px; }

        .obso-top{
          display:flex;
          justify-content:space-between;
          align-items:end;
          gap: 12px;
          flex-wrap: wrap;
        }
        .obso-kicker{
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
          font-size: 30px;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .obso-sub{
          margin-top: 6px;
          color: rgba(255,255,255,.66);
        }

        .obso-hr{
          border:0;
          border-top: 1px solid rgba(255,255,255,.12);
          margin: 16px 0;
        }

        .obso-grid{
          display:grid;
          grid-template-columns: 1fr .92fr;
          gap: 12px;
          align-items: start;
        }
        @media (max-width: 980px){
          .obso-grid{ grid-template-columns: 1fr; }
        }

        .obso-card{
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,.14);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 18px 60px rgba(0,0,0,.35);
        }

        .obso-h2{ color:#fff; margin:0; }
        .obso-muted{ color: rgba(255,255,255,.65); }

        .obso-btnGold{
          background: #D4AF37 !important;
          border-color: #D4AF37 !important;
          color: #111 !important;
          font-weight: 1000;
        }
        .obso-btnGhost{
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.88);
        }
        .obso-btnGhost:hover{ border-color: rgba(212,175,55,.35); }

        .obso-fieldGrid2{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .obso-fieldGrid3{
          display:grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 680px){
          .obso-fieldGrid2, .obso-fieldGrid3{ grid-template-columns: 1fr; }
        }

        /* input görünümü (var olan inputlar bozulmadan sadece bu sayfada override) */
        .obso-admin-add input{
          width: 100%;
          border-radius: 12px;
          padding: 12px 12px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(0,0,0,.28);
          color: rgba(255,255,255,.92);
          outline: none;
        }
        .obso-admin-add input::placeholder{
          color: rgba(255,255,255,.48);
          font-weight: 700;
        }
        .obso-admin-add input:focus{
          border-color: rgba(212,175,55,.45);
          box-shadow: 0 0 0 4px rgba(212,175,55,.12);
        }

        .obso-section{
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 16px;
          padding: 12px;
          background: rgba(255,255,255,.04);
        }

        .obso-error{
          margin-top: 10px;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,80,120,.35);
          background: rgba(255,80,120,.10);
          color: rgba(255,255,255,.92);
          font-weight: 800;
        }

        .obso-previewBox{
          width: 100%;
          height: 320px;
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,.14);
          overflow: hidden;
          background:
            radial-gradient(280px 160px at 30% 25%, rgba(255,255,255,.10), transparent 60%),
            linear-gradient(135deg, rgba(255,255,255,.06), rgba(212,175,55,.10));
          display: grid;
          place-items: center;
          position: relative;
        }
        .obso-previewBox::after{
          content:"";
          position:absolute; inset:0;
          background:
            linear-gradient(90deg, rgba(212,175,55,.08), transparent 40%, rgba(212,175,55,.06));
          pointer-events:none;
          opacity: .75;
        }
        .obso-previewEmpty{
          display:flex;
          flex-direction: column;
          align-items:center;
          gap: 10px;
          color: rgba(255,255,255,.72);
          font-weight: 900;
          text-align:center;
          padding: 18px;
          z-index: 1;
        }
        .obso-previewIcon{
          width: 56px;
          height: 56px;
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,.22);
          background: rgba(0,0,0,.25);
          display:grid;
          place-items:center;
          color: rgba(212,175,55,.95);
          font-size: 22px;
        }

        .obso-metaRow{
          display:flex;
          gap: 10px;
          align-items:center;
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
          color: rgba(255,255,255,.84);
        }
        .obso-badgeGold{
          border-color: rgba(212,175,55,.24);
          background: rgba(212,175,55,.10);
          color: rgba(255,255,255,.90);
        }

        .obso-label{
          font-size: 12px;
          font-weight: 1000;
          letter-spacing: .12em;
          color: rgba(255,255,255,.70);
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .obso-save{
          width: 100%;
          padding: 12px 14px;
        }
      `}</style>

      <div className="container obso-wrap" style={{ padding: "0 0" }}>
        <div className="obso-top">
          <div>
            <div className="obso-kicker">
              <span style={{ color: "#D4AF37" }}>◆</span> OBSO • ADMIN
            </div>

            <h1 className="h2 obso-title">Yeni Ürün Ekle</h1>
            <p className="p obso-sub">Premium form • Görsel destekli • Hızlı ekle</p>
          </div>

          {/* ✅ Link aynı */}
          <Link to="/admin/products" className="btn-ghost obso-btnGhost">
            ← Ürünlere dön
          </Link>
        </div>

        <hr className="obso-hr" />

        <div className="obso-grid">
          {/* FORM */}
          <div className="card obso-card">
            <div className="card-pad">
              <h2 className="h2 obso-h2">Ürün Bilgileri</h2>
              <p className="p obso-muted" style={{ marginTop: 6, fontSize: 13 }}>
                Alanları doldur • görsel ekle • kaydet
              </p>

              <div style={{ height: 12 }} />

              <form onSubmit={submit}>
                <div className="obso-section">
                  <div className="obso-label">Genel</div>

                  <div className="obso-fieldGrid2">
                    <input
                      placeholder="Ürün Adı"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      placeholder="Marka"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>

                  <div style={{ height: 10 }} />

                  <div className="obso-fieldGrid3">
                    <input
                      placeholder="Kategori"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />

                    <input
                      placeholder="Fiyat (₺)"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Stok"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ height: 12 }} />

                <div className="obso-section">
                  <div className="obso-label">Görsel</div>
                  <p className="p obso-muted" style={{ marginTop: 0, fontSize: 13 }}>
                    Dosya seçebilir veya link girebilirsin. (Max 1.5MB)
                  </p>

                  <div style={{ height: 10 }} />

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <label className="btn obso-btnGold" style={{ cursor: "pointer" }}>
                      Görsel Yükle
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => onPickFile(e.target.files?.[0])}
                      />
                    </label>

                    <button type="button" className="btn-ghost obso-btnGhost" onClick={clearImage}>
                      Kaldır
                    </button>
                  </div>

                  <div style={{ height: 10 }} />

                  <input
                    placeholder="Görsel URL (opsiyonel)"
                    value={image.startsWith("data:") ? "" : image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setPreview(e.target.value);
                    }}
                  />
                </div>

                {error && <div className="obso-error">⚠️ {error}</div>}

                <div style={{ height: 14 }} />

                <button className="btn obso-btnGold obso-save" type="submit">
                  Ürünü Kaydet
                </button>
              </form>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="card obso-card">
            <div className="card-pad">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h2 className="h2 obso-h2">Önizleme</h2>
                <span className="obso-badge obso-badgeGold">Live</span>
              </div>

              <div style={{ height: 12 }} />

              <div className="obso-previewBox">
                {hasPreview ? (
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 1,
                      filter: "contrast(1.02) saturate(1.02)",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="obso-previewEmpty">
                    <div className="obso-previewIcon">✦</div>
                    <div>Görsel seçilmedi</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,.58)" }}>
                      Dosya yükle veya URL ekle
                    </div>
                  </div>
                )}
              </div>

              <div style={{ height: 12 }} />

              <div style={{ fontWeight: 1000, fontSize: 16, color: "#fff" }}>
                {name || "Ürün adı"}
              </div>
              <div className="p" style={{ fontSize: 13, color: "rgba(255,255,255,.65)" }}>
                {brand || "Marka"} • {category || "Kategori"}
              </div>

              <div className="obso-metaRow">
                <div style={{ fontWeight: 1000, color: "#fff" }}>
                  {price ? `${priceNumber.toFixed(2)}₺` : "0₺"}
                </div>

                <div className="obso-badge">Stok: {stock}</div>

                {image ? (
                  <div className="obso-badge obso-badgeGold">
                    {image.startsWith("data:") ? "Base64" : "URL"}
                  </div>
                ) : (
                  <div className="obso-badge">Görsel: Yok</div>
                )}
              </div>

              <hr className="obso-hr" />

              <div style={{ display: "grid", gap: 8 }}>
                <div className="p" style={{ color: "rgba(255,255,255,.62)", fontSize: 13 }}>
                  ✅ Kaydettiğinde ürün <b style={{ color: "#fff" }}>/admin/products</b> listesine düşer.
                </div>
                <div className="p" style={{ color: "rgba(255,255,255,.62)", fontSize: 13 }}>
                  ✅ Görseli kaldırmak için <b style={{ color: "#fff" }}>Kaldır</b> butonunu kullan.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 14 }} />
      </div>
    </div>
  );
}
