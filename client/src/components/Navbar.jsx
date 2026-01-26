import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totals } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPage = location.pathname.startsWith("/admin");
const customer = JSON.parse(localStorage.getItem("customerUser") || "null");

const logoutCustomer = () => {
  localStorage.removeItem("customerUser");
  navigate("/");
};
  // ✅ Admin bar
  if (isAdminPage) {
    const admin = JSON.parse(localStorage.getItem("adminUser") || "null");

    const logoutAdmin = () => {
      localStorage.removeItem("adminUser");
      navigate("/");
    };

    return (
      <header
        style={{
          borderBottom: "1px solid #e5e7eb",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          className="container"
          style={{
            height: 68,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontWeight: 900, letterSpacing: "0.08em" }}>
            ADMIN PANEL
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              👤 {admin?.username || "admin"}
            </span>

            <Link to="/" className="btn-ghost" style={{ padding: "8px 14px" }}>
              Mağazaya Dön
            </Link>

            <button
              className="btn"
              style={{ padding: "8px 14px" }}
              onClick={logoutAdmin}
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ✅ Customer navbar
  const isActive = (path) =>
    location.pathname === path
      ? { borderBottom: "2px solid #000", paddingBottom: 2 }
      : { opacity: 0.9 };

  return (
    <header
      style={{
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          height: 68,
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <Link
          to="/"
          style={{ fontWeight: 900, letterSpacing: "0.08em", fontSize: 18 }}
        >
          THECH BEAUTY
        </Link>

        <nav style={{ display: "flex", gap: 18, marginLeft: 10 }}>
          <Link to="/" style={isActive("/")}>
            Anasayfa
          </Link>
          <Link to="/shop" style={isActive("/shop")}>
            Mağaza
          </Link>
          <Link to="/about" style={isActive("/about")}>
            Hakkımızda
          </Link>
          <Link to="/cart" style={isActive("/cart")}>
            Sepet{" "}
            {totals.items > 0 && (
              <span
                style={{
                  marginLeft: 6,
                  background: "#000",
                  color: "#fff",
                  borderRadius: 999,
                  padding: "2px 8px",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {totals.items}
              </span>
            )}
          </Link>
        </nav>

<div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
  {customer ? (
    <>
      <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>
        👤 Merhaba, {customer.username}
      </span>
      <button className="btn" style={{ padding: "8px 14px" }} onClick={logoutCustomer}>
        Çıkış
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="btn" style={{ padding: "8px 14px" }}>
        Giriş Yap
      </Link>
      <Link to="/register" className="btn-ghost" style={{ padding: "8px 14px" }}>
        Hesap Oluştur
      </Link>
    </>
  )}
</div>

      </div>
    </header>
  );
}
