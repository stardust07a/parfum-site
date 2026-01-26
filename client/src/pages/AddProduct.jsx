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

  return (
    <div className="container" style={{ padding: "22px 0", maxWidth: 980 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 className="h2" style={{ fontSize: 28 }}>
            Yeni Ürün Ekle
          </h1>
          <p className="p" style={{ marginTop: 6 }}>
            Premium form • Görsel destekli
          </p>
        </div>
        <Link to="/admin/products" className="btn-ghost">
          ← Ürünlere dön
        </Link>
      </div>

      <div className="hr" />

      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr .9fr",
          alignItems: "start",
          gap: 12,
        }}
      >
        {/* FORM */}
        <div className="card">
          <div className="card-pad">
            <h2 className="h2">Ürün Bilgileri</h2>

            <form onSubmit={submit} style={{ marginTop: 12 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
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

              {/* ✅ kategori + fiyat + stok */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                }}
              >
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

              <div style={{ height: 16 }} />

              <h2 className="h2">Görsel</h2>
              <p className="p" style={{ marginTop: 6, fontSize: 13 }}>
                Dosya seçebilir veya link girebilirsin.
              </p>

              <div style={{ height: 10 }} />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <label className="btn" style={{ cursor: "pointer" }}>
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
                  className="btn-ghost"
                  onClick={() => {
                    setImage("");
                    setPreview("");
                  }}
                >
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

              {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

              <div style={{ height: 14 }} />
              <button className="btn" type="submit" style={{ width: "100%" }}>
                Ürünü Kaydet
              </button>
            </form>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="card">
          <div className="card-pad">
            <h2 className="h2">Önizleme</h2>
            <div style={{ height: 12 }} />

            <div
              style={{
                width: "100%",
                height: 320,
                borderRadius: 18,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, rgba(0,0,0,.06), rgba(255,45,85,.10))",
                display: "grid",
                placeItems: "center",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ opacity: 0.85, fontWeight: 800 }}>
                  Görsel seçilmedi
                </div>
              )}
            </div>

            <div style={{ height: 12 }} />
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              {name || "Ürün adı"}
            </div>
            <div className="p" style={{ fontSize: 13 }}>
              {brand || "Marka"} • {category || "Kategori"}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontWeight: 900 }}>
                {price ? `${price}₺` : "0₺"}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                  background: "#fafafa",
                }}
              >
                Stok: {stock}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
