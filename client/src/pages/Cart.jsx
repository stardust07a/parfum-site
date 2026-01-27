import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, totals, increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="obso-cart">
      <style>{`
        .obso-cart{
          background:
            radial-gradient(1200px 700px at 18% -10%, rgba(212,175,55,.18), transparent 60%),
            radial-gradient(900px 600px at 95% 0%, rgba(120,170,255,.10), transparent 55%),
            linear-gradient(180deg, #07070a 0%, #0b0b10 50%, #08080b 100%);
          min-height: 100vh;
          padding: 22px 0;
        }
        .obso-card{
          border-radius: 18px;
          border: 1px solid rgba(212,175,55,.14);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 18px 60px rgba(0,0,0,.35);
        }
        .obso-hr{
          border:0;
          border-top: 1px solid rgba(255,255,255,.12);
          margin: 16px 0;
        }
        .obso-top{
          display:flex;
          justify-content: space-between;
          align-items: end;
          gap: 12px;
          flex-wrap: wrap;
        }
        .obso-title{ color:#fff; margin:0; font-size: 30px; letter-spacing: -0.02em; }
        .obso-sub{ color: rgba(255,255,255,.65); margin-top: 6px; }
        .obso-ghost{
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.88);
        }
        .obso-ghost:hover{ border-color: rgba(212,175,55,.35); }
        .obso-btnGold{
          background: #D4AF37 !important;
          border-color: #D4AF37 !important;
          color: #111 !important;
          font-weight: 1000;
        }

        .obso-layout{
          display:grid;
          grid-template-columns: 1fr 380px;
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 980px){
          .obso-layout{ grid-template-columns: 1fr; }
        }

        .obso-listHead{
          display:flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }
        .obso-muted{ color: rgba(255,255,255,.62); font-size: 13px; font-weight: 800; }

        .obso-item{
          display:grid;
          grid-template-columns: 92px 1fr auto;
          gap: 12px;
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          transition: transform .18s ease, border-color .18s ease;
          margin-top: 10px;
        }
        .obso-item:hover{
          transform: translateY(-2px);
          border-color: rgba(212,175,55,.22);
        }
        @media (max-width: 640px){
          .obso-item{ grid-template-columns: 84px 1fr; }
          .obso-priceCol{ grid-column: 1 / -1; display:flex; justify-content: space-between; align-items:center; margin-top: 6px; }
        }

        .obso-thumb{
          width: 92px;
          height: 92px;
          border-radius: 16px;
          overflow:hidden;
          border: 1px solid rgba(212,175,55,.14);
          background:
            radial-gradient(120px 80px at 30% 25%, rgba(255,255,255,.10), transparent 60%),
            linear-gradient(135deg, rgba(255,255,255,.06), rgba(212,175,55,.10));
          display:grid;
          place-items:center;
        }
        .obso-thumb img{ width: 100%; height: 100%; object-fit: cover; display:block; }

        .obso-name{ color:#fff; font-weight: 1000; }
        .obso-meta{ color: rgba(255,255,255,.62); font-size: 12px; margin-top: 4px; }

        .obso-controls{
          display:flex;
          align-items:center;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .obso-qty{
          display:inline-flex;
          align-items:center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(0,0,0,.22);
          overflow:hidden;
        }
        .obso-qty button{
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.90);
          padding: 8px 10px;
          cursor:pointer;
          font-weight: 1000;
        }
        .obso-qty button:hover{ background: rgba(255,255,255,.06); }
        .obso-qty span{
          min-width: 32px;
          text-align:center;
          color:#fff;
          font-weight: 1000;
        }

        .obso-remove{
          margin-left: auto;
          border: 1px solid rgba(255,120,150,.22);
          background: rgba(255,80,120,.10);
          color: rgba(255,255,255,.90);
          border-radius: 999px;
          padding: 8px 12px;
          font-weight: 1000;
          cursor:pointer;
        }
        .obso-remove:hover{ border-color: rgba(255,120,150,.35); }

        .obso-price{
          color:#fff;
          font-weight: 1100;
          font-size: 16px;
          white-space: nowrap;
          text-align: right;
        }
        .obso-unit{
          color: rgba(255,255,255,.60);
          font-size: 12px;
          font-weight: 800;
          text-align: right;
          margin-top: 4px;
        }

        .obso-summary{
          position: sticky;
          top: 90px; /* navbar sticky ise güzel oturur */
        }
        @media (max-width: 980px){
          .obso-summary{ position: static; top: auto; }
        }
        .obso-row{
          display:flex;
          justify-content: space-between;
          align-items:center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,.10);
          color: rgba(255,255,255,.75);
          font-weight: 800;
          font-size: 13px;
        }
        .obso-row:last-child{ border-bottom: 0; }
        .obso-total{
          display:flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
          margin-top: 10px;
        }
        .obso-total span:first-child{ color:#fff; font-weight: 1100; }
        .obso-total span:last-child{ color:#fff; font-weight: 1100; font-size: 22px; }

        .obso-hint{
          margin-top: 12px;
          padding: 10px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.05);
          color: rgba(255,255,255,.62);
          font-size: 12px;
          font-weight: 800;
        }
      `}</style>

      <div className="container" style={{ padding: "0 0" }}>
        <div className="obso-top">
          <div>
            <h1 className="h2 obso-title">Sepet</h1>
            <p className="p obso-sub">Ürünlerini kontrol et ve ödeme yap.</p>
          </div>

          <Link to="/shop" className="btn-ghost obso-ghost">
            ← Mağazaya dön
          </Link>
        </div>

        <hr className="obso-hr" />

        {cart.length === 0 ? (
          <div className="card obso-card">
            <div className="card-pad">
              <h2 className="h2" style={{ color: "#fff" }}>Sepet boş</h2>
              <p className="p" style={{ marginTop: 8, color: "rgba(255,255,255,.65)" }}>
                Mağazadan ürün ekleyebilirsin.
              </p>
              <div style={{ height: 12 }} />
              <Link to="/shop" className="btn obso-btnGold">
                Mağazaya Git
              </Link>
            </div>
          </div>
        ) : (
          <div className="obso-layout">
            {/* LIST */}
            <div className="card obso-card">
              <div className="card-pad">
                <div className="obso-listHead">
                  <h2 className="h2" style={{ color: "#fff", margin: 0 }}>Ürünler</h2>
                  <div className="obso-muted">
                    Toplam ürün: <b style={{ color: "#fff" }}>{totals.items}</b>
                  </div>
                </div>

                {cart.map((x) => {
                  const lineTotal = Number(x.price) * x.qty;

                  return (
                    <div key={x.id} className="obso-item">
                      <div className="obso-thumb">
                        {x.image ? (
                          <img src={x.image} alt={x.name} />
                        ) : (
                          <div style={{ color: "rgba(212,175,55,.9)", fontWeight: 1000 }}>✦</div>
                        )}
                      </div>

                      <div>
                        <div className="obso-name">{x.name}</div>
                        <div className="obso-meta">
                          {x.brand} • {x.category}
                        </div>

                        <div className="obso-controls">
                          <div className="obso-qty" aria-label="Quantity controls">
                            <button type="button" onClick={() => decreaseQty(x.id)} aria-label="Decrease">
                              −
                            </button>
                            <span>{x.qty}</span>
                            <button type="button" onClick={() => increaseQty(x.id)} aria-label="Increase">
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="obso-remove"
                            onClick={() => removeFromCart(x.id)}
                          >
                            Kaldır
                          </button>
                        </div>
                      </div>

                      <div className="obso-priceCol">
                        <div className="obso-price">{lineTotal.toFixed(2)}₺</div>
                        <div className="obso-unit">
                          {Number(x.price).toFixed(2)}₺ / adet
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="obso-summary">
              <div className="card obso-card">
                <div className="card-pad">
                  <h2 className="h2" style={{ color: "#fff", margin: 0 }}>Özet</h2>

                  <div style={{ height: 12 }} />

                  <div className="obso-row">
                    <span>Ürünler</span>
                    <span style={{ color: "#fff" }}>{totals.subtotal.toFixed(2)}₺</span>
                  </div>

                  <div className="obso-total">
                    <span>Toplam</span>
                    <span>{totals.subtotal.toFixed(2)}₺</span>
                  </div>

                  <div style={{ height: 12 }} />

                  <button
                    className="btn obso-btnGold"
                    style={{ width: "100%" }}
                    onClick={() => navigate("/checkout")}
                  >
                    Ödemeye Geç
                  </button>

                  <div className="obso-hint">
                    💡 İpucu: Sepetteki adetleri buradan düzenleyebilirsin. Ödeme adımında demo ödeme formu var.
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
