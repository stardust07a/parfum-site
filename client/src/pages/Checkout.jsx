import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totals, clearCart } = useCart();

  const customer = JSON.parse(localStorage.getItem("customerUser") || "null");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  // payment
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!customer) navigate("/login");
  }, [customer, navigate]);

  const shipping = totals.subtotal > 0 ? 49.9 : 0;
  const total = totals.subtotal + shipping;

  const onlyDigits = (s) => s.replace(/\D/g, "");

  const submitOrder = (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !phone || !city || !address) {
      return setError("Lütfen teslimat bilgilerini eksiksiz doldur.");
    }

    const cardDigits = onlyDigits(cardNumber);
    if (cardDigits.length !== 16) return setError("Kart numarası 16 haneli olmalı.");
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return setError("Son kullanma MM/YY formatında olmalı.");
    if (!/^\d{3}$/.test(cvv)) return setError("CVV 3 haneli olmalı.");

    // ✅ DEMO ödeme başarılı
    setDone(true);
    clearCart();
  };

  if (!customer) return null;

  if (done) {
    return (
      <div className="container" style={{ padding: "26px 0" }}>
        <div className="card">
          <div className="card-pad">
            <h2 className="h2">✅ Ödeme Başarılı</h2>
            <p className="p" style={{ marginTop: 10 }}>
              Siparişin alındı {customer.username}! (Demo ödeme)
            </p>

            <div style={{ height: 14 }} />
            <Link to="/shop" className="btn">Mağazaya dön</Link>
            <Link to="/" className="btn-ghost" style={{ marginLeft: 10 }}>Anasayfa</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "26px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h1 className="h2" style={{ fontSize: 28 }}>Ödeme</h1>
          <p className="p" style={{ marginTop: 6 }}>Teslimat + kart bilgilerini gir.</p>
        </div>
        <Link to="/cart" className="btn-ghost">← Sepete dön</Link>
      </div>

      <div className="hr" />

      {cart.length === 0 ? (
        <div className="card">
          <div className="card-pad">
            <h2 className="h2">Sepet boş</h2>
            <p className="p" style={{ marginTop: 8 }}>Önce mağazadan ürün eklemelisin.</p>
            <div style={{ height: 12 }} />
            <Link to="/shop" className="btn">Mağazaya git</Link>
          </div>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: "1fr .9fr", alignItems: "start" }}>
          {/* FORM */}
          <div className="card">
            <div className="card-pad">
              <h2 className="h2">Teslimat Bilgileri</h2>

              <form onSubmit={submitOrder} style={{ marginTop: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} />
<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="E-posta"
  required
/>                </div>

                <div style={{ height: 10 }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <input placeholder="Şehir" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div style={{ height: 10 }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input placeholder="Posta Kodu" value={zip} onChange={(e) => setZip(e.target.value)} />
                  <input placeholder="Adres (kısa)" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div style={{ height: 18 }} />
                <h2 className="h2">Kart Bilgileri</h2>

                <div style={{ height: 10 }} />

                <input
                  placeholder="Kart Üzerindeki İsim"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />

                <div style={{ height: 10 }} />

<input
  value={cardNumber}
  onChange={(e) =>
    setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
  }
  inputMode="numeric"
  placeholder="Kart Numarası (16 hane)"
  maxLength={16}
  required
/>

                <div style={{ height: 10 }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
<input
  value={expiry}
  onChange={(e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    setExpiry(v);
  }}
  placeholder="MM/YY"
  maxLength={5}
  required
/>
<input
  value={cvv}
  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
  inputMode="numeric"
  placeholder="CVV (3 hane)"
  maxLength={3}
  required
/>
                </div>

                {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

                <div style={{ height: 14 }} />
                <button className="btn" type="submit" style={{ width: "100%" }}>
                  Ödemeyi Tamamla
                </button>

                <p className="p" style={{ fontSize: 12, marginTop: 10 }}>
                  * Demo proje: kart bilgisi kaydedilmez.
                </p>
              </form>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="card">
            <div className="card-pad">
              <h2 className="h2">Sipariş Özeti</h2>

              <div style={{ height: 12 }} />

              {cart.map((x) => (
                <div
                  key={x.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "10px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{x.name}</div>
                    <div className="p" style={{ fontSize: 12 }}>
                      {x.qty} adet • {x.brand}
                    </div>
                  </div>
                  <div style={{ fontWeight: 800 }}>
                    {(Number(x.price) * x.qty).toFixed(2)}₺
                  </div>
                </div>
              ))}

              <div style={{ height: 12 }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="p">Ara Toplam</span>
                <b>{totals.subtotal.toFixed(2)}₺</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="p">Kargo</span>
                <b>{shipping.toFixed(2)}₺</b>
              </div>

              <div className="hr" />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 900 }}>Toplam</span>
                <span style={{ fontWeight: 900, fontSize: 20 }}>{total.toFixed(2)}₺</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
