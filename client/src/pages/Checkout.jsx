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
      <div className="obso-checkout">
        <style>{checkoutCss}</style>

        <div className="container" style={{ padding: "0 0" }}>
          <div className="obso-success card obso-card">
            <div className="card-pad">
              <div className="obso-pill">
                <span style={{ color: "#D4AF37" }}>◆</span> OBSO • CHECKOUT
              </div>

              <div style={{ height: 10 }} />
              <h2 className="h2 obso-title">✅ Ödeme Başarılı</h2>
              <p className="p obso-sub">
                Siparişin alındı <b style={{ color: "#fff" }}>{customer.username}</b>! (Demo ödeme)
              </p>

              <div className="obso-bars" aria-hidden="true">
                <div className="obso-bar a" />
                <div className="obso-bar b" />
                <div className="obso-bar c" />
              </div>

              <div style={{ height: 14 }} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link to="/shop" className="btn obso-btnGold">
                  Mağazaya dön
                </Link>
                <Link to="/" className="btn-ghost obso-btnGhost">
                  Anasayfa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="obso-checkout">
      <style>{checkoutCss}</style>

      <div className="container" style={{ padding: "0 0" }}>
        {/* TOP */}
        <div className="obso-top">
          <div>
            <div className="obso-pill">
              <span style={{ color: "#D4AF37" }}>◆</span> OBSO • CHECKOUT
            </div>
            <h1 className="h2 obso-title">Ödeme</h1>
            <p className="p obso-sub">Teslimat + kart bilgilerini gir.</p>
          </div>

          <Link to="/cart" className="btn-ghost obso-btnGhost">
            ← Sepete dön
          </Link>
        </div>

        <hr className="obso-hr" />

        {cart.length === 0 ? (
          <div className="card obso-card">
            <div className="card-pad">
              <h2 className="h2" style={{ color: "#fff" }}>Sepet boş</h2>
              <p className="p" style={{ marginTop: 8, color: "rgba(255,255,255,.65)" }}>
                Önce mağazadan ürün eklemelisin.
              </p>
              <div style={{ height: 12 }} />
              <Link to="/shop" className="btn obso-btnGold">
                Mağazaya git
              </Link>
            </div>
          </div>
        ) : (
          <div className="obso-layout">
            {/* FORM */}
            <div className="card obso-card">
              <div className="card-pad">
                {/* SECTION: SHIPPING */}
                <div className="obso-sectionHead">
                  <h2 className="h2" style={{ color: "#fff", margin: 0 }}>Teslimat Bilgileri</h2>
                  <span className="obso-chip">Güvenli • Demo</span>
                </div>

                <form onSubmit={submitOrder} style={{ marginTop: 12 }}>
                  <div className="obso-block">
                    <div className="obso-grid2">
                      <div>
                        <div className="obso-label">Ad Soyad</div>
                        <input
                          placeholder="Ad Soyad"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>

                      <div>
                        <div className="obso-label">E-posta</div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="E-posta"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ height: 10 }} />

                    <div className="obso-grid2">
                      <div>
                        <div className="obso-label">Telefon</div>
                        <input
                          placeholder="Telefon"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div>
                        <div className="obso-label">Şehir</div>
                        <input
                          placeholder="Şehir"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ height: 10 }} />

                    <div className="obso-grid2">
                      <div>
                        <div className="obso-label">Posta Kodu</div>
                        <input
                          placeholder="Posta Kodu"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>

                      <div>
                        <div className="obso-label">Adres</div>
                        <input
                          placeholder="Adres (kısa)"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 16 }} />

                  {/* SECTION: PAYMENT */}
                  <div className="obso-sectionHead">
                    <h2 className="h2" style={{ color: "#fff", margin: 0 }}>Kart Bilgileri</h2>
                    <span className="obso-chip">Kart verisi kaydedilmez</span>
                  </div>

                  <div className="obso-block" style={{ marginTop: 12 }}>
                    <div>
                      <div className="obso-label">Kart Üzerindeki İsim</div>
                      <input
                        placeholder="Kart Üzerindeki İsim"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <div style={{ height: 10 }} />

                    <div>
                      <div className="obso-label">Kart Numarası</div>
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
                    </div>

                    <div style={{ height: 10 }} />

                    <div className="obso-grid2">
                      <div>
                        <div className="obso-label">Son Kullanma</div>
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
                      </div>

                      <div>
                        <div className="obso-label">CVV</div>
                        <input
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          inputMode="numeric"
                          placeholder="CVV (3 hane)"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {error && <div className="obso-error">⚠️ {error}</div>}

                  <div style={{ height: 14 }} />

                  <button className="btn obso-btnGold" type="submit" style={{ width: "100%" }}>
                    Ödemeyi Tamamla • {total.toFixed(2)}₺
                  </button>

                  <div className="obso-note">
                    * Demo proje: kart bilgisi kaydedilmez.
                  </div>
                </form>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="obso-summary">
              <div className="card obso-card">
                <div className="card-pad">
                  <div className="obso-sectionHead">
                    <h2 className="h2" style={{ color: "#fff", margin: 0 }}>Sipariş Özeti</h2>
                    <span className="obso-chip">Toplam: {total.toFixed(2)}₺</span>
                  </div>

                  <div style={{ height: 12 }} />

                  <div className="obso-lines">
                    {cart.map((x) => (
                      <div key={x.id} className="obso-line">
                        <div>
                          <div className="obso-lineName">{x.name}</div>
                          <div className="obso-lineMeta">
                            {x.qty} adet • {x.brand}
                          </div>
                        </div>
                        <div className="obso-linePrice">
                          {(Number(x.price) * x.qty).toFixed(2)}₺
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ height: 12 }} />

                  <div className="obso-row">
                    <span>Ara Toplam</span>
                    <b style={{ color: "#fff" }}>{totals.subtotal.toFixed(2)}₺</b>
                  </div>
                  <div className="obso-row">
                    <span>Kargo</span>
                    <b style={{ color: "#fff" }}>{shipping.toFixed(2)}₺</b>
                  </div>

                  <hr className="obso-hr" />

                  <div className="obso-total">
                    <span>Toplam</span>
                    <span>{total.toFixed(2)}₺</span>
                  </div>

                  <div className="obso-bars" aria-hidden="true" style={{ marginTop: 12 }}>
                    <div className="obso-bar a" />
                    <div className="obso-bar b" />
                    <div className="obso-bar c" />
                  </div>

                  <div className="obso-mini">
                    Güvenli ödeme görünümü • Demo checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const checkoutCss = `
  .obso-checkout{
    background:
      radial-gradient(1200px 700px at 18% -10%, rgba(212,175,55,.18), transparent 60%),
      radial-gradient(900px 600px at 95% 0%, rgba(120,170,255,.10), transparent 55%),
      linear-gradient(180deg, #07070a 0%, #0b0b10 50%, #08080b 100%);
    min-height: 100vh;
    padding: 26px 0;
  }
  .obso-card{
    border-radius: 18px;
    border: 1px solid rgba(212,175,55,.14);
    background: rgba(255,255,255,.06);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 18px 60px rgba(0,0,0,.35);
  }
  .obso-top{
    display:flex;
    justify-content: space-between;
    align-items: end;
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
    font-weight: 1000;
  }
  .obso-btnGhost{
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.06);
    color: rgba(255,255,255,.88);
  }
  .obso-btnGhost:hover{ border-color: rgba(212,175,55,.35); }

  .obso-layout{
    display:grid;
    grid-template-columns: 1fr 420px;
    gap: 14px;
    align-items: start;
  }
  @media (max-width: 1050px){
    .obso-layout{ grid-template-columns: 1fr; }
  }

  .obso-summary{
    position: sticky;
    top: 90px;
  }
  @media (max-width: 1050px){
    .obso-summary{ position: static; top: auto; }
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
  @media (max-width: 700px){
    .obso-grid2{ grid-template-columns: 1fr; }
  }

  .obso-label{
    font-size: 12px;
    font-weight: 1000;
    letter-spacing: .12em;
    color: rgba(255,255,255,.70);
    margin: 0 0 6px;
    text-transform: uppercase;
  }

  .obso-checkout input{
    width: 100%;
    border-radius: 12px;
    padding: 12px 12px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(0,0,0,.28);
    color: rgba(255,255,255,.92);
    outline: none;
  }
  .obso-checkout input::placeholder{
    color: rgba(255,255,255,.48);
    font-weight: 700;
  }
  .obso-checkout input:focus{
    border-color: rgba(212,175,55,.45);
    box-shadow: 0 0 0 4px rgba(212,175,55,.12);
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

  .obso-lines{
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 18px;
    background: rgba(255,255,255,.04);
    overflow:hidden;
  }
  .obso-line{
    display:flex;
    justify-content: space-between;
    gap: 10px;
    padding: 12px;
    border-bottom: 1px solid rgba(255,255,255,.10);
  }
  .obso-line:last-child{ border-bottom: 0; }
  .obso-lineName{ color:#fff; font-weight: 1000; }
  .obso-lineMeta{ color: rgba(255,255,255,.62); font-size: 12px; margin-top: 4px; font-weight: 800; }
  .obso-linePrice{ color:#fff; font-weight: 1000; white-space: nowrap; }

  .obso-row{
    display:flex;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 0;
    color: rgba(255,255,255,.72);
    font-weight: 900;
  }
  .obso-total{
    display:flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .obso-total span:first-child{ color:#fff; font-weight: 1100; }
  .obso-total span:last-child{ color:#fff; font-weight: 1100; font-size: 22px; }

  .obso-bars{ display:flex; gap:8px; margin-top: 10px; }
  .obso-bar{ height:6px; flex:1; border-radius:999px; }
  .obso-bar.a{ background: linear-gradient(90deg, rgba(212,175,55,.95), rgba(212,175,55,.18)); }
  .obso-bar.b{ background: linear-gradient(90deg, rgba(255,255,255,.55), rgba(255,255,255,.08)); }
  .obso-bar.c{ background: linear-gradient(90deg, rgba(120,170,255,.35), rgba(120,170,255,.08)); }

  .obso-mini{
    margin-top: 10px;
    color: rgba(255,255,255,.60);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .02em;
  }

  .obso-success{
    max-width: 820px;
    margin: 0 auto;
  }
`;
