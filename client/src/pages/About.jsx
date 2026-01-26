import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container" style={{ padding: "22px 0" }}>
      {/* HERO */}
      <div
        className="card"
        style={{
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          background:
            "linear-gradient(135deg, rgba(0,0,0,.06), rgba(255,45,85,.14))",
        }}
      >
        <div className="card-pad" style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: ".10em", opacity: 0.8 }}>
            THECH BEAUTY
          </div>

          <h1 className="h2" style={{ fontSize: 34, lineHeight: 1.1 }}>
            Güzellik dünyasında <br /> modern & premium deneyim ✨
          </h1>

          <p className="p" style={{ maxWidth: 650 }}>
            Thech Beauty; seçilmiş ürünleri, hızlı teslimatı ve şık alışveriş deneyimiyle
            güzelliği daha kolay ulaşılır hale getiren bir e-commerce projesidir.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
            <Link to="/shop" className="btn">Mağazayı Keşfet</Link>
            <Link to="/register" className="btn-ghost">Hesap Oluştur</Link>
          </div>
        </div>
      </div>

      <div className="hr" />

      {/* CARDS */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <InfoCard
          title="💎 Premium Seçki"
          desc="Popüler markalar ve trend ürünler tek yerde. Minimal ama kaliteli ürün havuzu."
        />
        <InfoCard
          title="🚚 Hızlı Teslimat"
          desc="Siparişler hızlı hazırlanır, güvenli paketleme ile yola çıkar."
        />
        <InfoCard
          title="🔒 Güvenli Ödeme (Demo)"
          desc="Checkout sayfası demo ödeme alanıyla tasarlandı (kart verisi kaydedilmez)."
        />
      </div>

      <div style={{ height: 12 }} />

      {/* STORY */}
      <div className="grid" style={{ gridTemplateColumns: "1.2fr .8fr", gap: 12 }}>
        <div className="card">
          <div className="card-pad">
            <h2 className="h2">Biz Kimiz?</h2>
            <p className="p" style={{ marginTop: 10 }}>
              Bu proje; React + Node.js + SQLite ile geliştirilen bir “Beauty E-commerce” sitesidir.
              Müşteri tarafında mağaza deneyimi bulunur; Admin tarafında ise ürün ekleme/düzenleme/silme
              işlemleri yapılır.
            </p>

            <div style={{ height: 12 }} />

            <div className="hr" />

            <h2 className="h2">Misyonumuz</h2>
            <p className="p" style={{ marginTop: 10 }}>
              Kullanıcıların ürünleri kolayca bulduğu, şık şekilde sepete eklediği ve
              ödeme adımında problemsiz ilerlediği modern bir arayüz sunmak.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-pad">
            <h2 className="h2">Neler Sunuyoruz?</h2>

            <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.9 }}>
              <li>Modern Shop sayfası</li>
              <li>Sepet + adet artır/azalt</li>
              <li>Checkout + ödeme formu</li>
              <li>Admin Panel (ürün yönetimi)</li>
              <li>Görsel yükleme + önizleme</li>
            </ul>

            <div style={{ height: 14 }} />

            <Link to="/shop" className="btn" style={{ width: "100%", textAlign: "center" }}>
              Ürünleri Gör
            </Link>
          </div>
        </div>
      </div>

      <div className="hr" />

      {/* FAQ */}
      <div className="card">
        <div className="card-pad">
          <h2 className="h2">Sık Sorulan Sorular</h2>

          <div style={{ height: 10 }} />

          <Faq q="Ürünler gerçek mi?" a="Bu proje bir demo e-commerce projesidir. Ürünler admin panelden yönetilir." />
          <Faq q="Ödeme gerçek mi?" a="Hayır. Kart bilgileri demo amaçlıdır ve kaydedilmez." />
          <Faq q="Admin paneline kim girer?" a="Sadece admin kullanıcı adı/şifresi ile girilir. Müşteri tarafında görünmez." />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, desc }) {
  return (
    <div className="card">
      <div className="card-pad">
        <div style={{ fontWeight: 900 }}>{title}</div>
        <p className="p" style={{ marginTop: 8 }}>{desc}</p>
      </div>
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <div style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
      <div style={{ fontWeight: 900 }}>{q}</div>
      <div className="p" style={{ marginTop: 6 }}>{a}</div>
    </div>
  );
}
