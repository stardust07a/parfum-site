import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, totals, increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="container" style={{ padding: "22px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 className="h2" style={{ fontSize: 28 }}>Sepet</h1>
          <p className="p" style={{ marginTop: 6 }}>Ürünlerini kontrol et ve ödeme yap.</p>
        </div>
        <Link to="/shop" className="btn-ghost">← Mağazaya dön</Link>
      </div>

      <div className="hr" />

      {cart.length === 0 ? (
        <div className="card">
          <div className="card-pad">
            <h2 className="h2">Sepet boş</h2>
            <p className="p" style={{ marginTop: 8 }}>Mağazadan ürün ekleyebilirsin.</p>
            <div style={{ height: 12 }} />
            <Link to="/shop" className="btn">Mağazaya Git</Link>
          </div>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: "1fr .9fr", gap: 12, alignItems: "start" }}>
          {/* LIST */}
          <div className="card">
            <div className="card-pad">
              <h2 className="h2">Ürünler</h2>

              <div style={{ height: 10 }} />

              {cart.map((x) => (
                <div
                  key={x.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "12px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      width: 78,
                      height: 78,
                      borderRadius: 16,
                      overflow: "hidden",
                      border: "1px solid #e5e7eb",
                      background: "linear-gradient(135deg, rgba(0,0,0,.06), rgba(255,45,85,.10))",
                      flexShrink: 0,
                    }}
                  >
                    {x.image ? (
                      <img
                        src={x.image}
                        alt={x.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : null}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900 }}>{x.name}</div>
                    <div className="p" style={{ fontSize: 12 }}>
                      {x.brand} • {x.category}
                    </div>

                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
                      <button className="btn-ghost" onClick={() => decreaseQty(x.id)}>-</button>
                      <div style={{ fontWeight: 900, minWidth: 24, textAlign: "center" }}>{x.qty}</div>
                      <button className="btn-ghost" onClick={() => increaseQty(x.id)}>+</button>

                      <button
                        className="btn-ghost"
                        style={{ marginLeft: "auto", borderColor: "#fecaca" }}
                        onClick={() => removeFromCart(x.id)}
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>

                  <div style={{ fontWeight: 900 }}>
                    {(Number(x.price) * x.qty).toFixed(2)}₺
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="card">
            <div className="card-pad">
              <h2 className="h2">Özet</h2>

              <div style={{ height: 12 }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="p">Ürünler</span>
                <b>{totals.subtotal.toFixed(2)}₺</b>
              </div>

              <div className="hr" />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 900 }}>Toplam</span>
                <span style={{ fontWeight: 900, fontSize: 20 }}>{totals.subtotal.toFixed(2)}₺</span>
              </div>

              <div style={{ height: 12 }} />
              <button className="btn" style={{ width: "100%" }} onClick={() => navigate("/checkout")}>
                Ödemeye Geç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
