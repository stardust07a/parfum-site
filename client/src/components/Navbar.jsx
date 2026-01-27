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

  // ✅ Admin bar (mantık aynı, sadece tasarım lüks)
  if (isAdminPage) {
    const admin = JSON.parse(localStorage.getItem("adminUser") || "null");

    const logoutAdmin = () => {
      localStorage.removeItem("adminUser");
      navigate("/");
    };

    return (
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(212,175,55,.16)",
          background:
            "linear-gradient(180deg, rgba(10,10,14,.96), rgba(10,10,14,.88))",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <style>{`
          .obso-admin-wrap{
            height: 70px;
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .obso-admin-pill{
            display:inline-flex;
            align-items:center;
            gap:10px;
            padding: 8px 12px;
            border-radius: 999px;
            border: 1px solid rgba(212,175,55,.22);
            background: rgba(212,175,55,.08);
            color: rgba(255,255,255,.9);
            font-weight: 900;
            letter-spacing: .10em;
            font-size: 12px;
          }
          .obso-admin-user{
            font-size: 13px;
            color: rgba(255,255,255,.70);
            font-weight: 700;
          }
          .obso-btn-gold{
            background: #D4AF37 !important;
            border-color: #D4AF37 !important;
            color: #111 !important;
            font-weight: 900;
          }
          .obso-btn-ghost{
            border: 1px solid rgba(255,255,255,.14);
            background: rgba(255,255,255,.06);
            color: rgba(255,255,255,.88);
          }
          .obso-btn-ghost:hover{ border-color: rgba(212,175,55,.35); }
        `}</style>

        <div className="container obso-admin-wrap">
          <div className="obso-admin-pill">
            <span style={{ color: "#D4AF37" }}>◆</span> ADMIN PANEL
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span className="obso-admin-user">👤 {admin?.username || "admin"}</span>

            <Link to="/" className="btn-ghost obso-btn-ghost" style={{ padding: "8px 14px" }}>
              Mağazaya Dön
            </Link>

            <button className="btn obso-btn-gold" style={{ padding: "8px 14px" }} onClick={logoutAdmin}>
              Çıkış
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ✅ Customer navbar (linkler aynı, sadece stil)
  const isActive = (path) =>
    location.pathname === path
      ? { opacity: 1 }
      : { opacity: 0.78 };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(212,175,55,.16)",
        background:
          "linear-gradient(180deg, rgba(10,10,14,.96), rgba(10,10,14,.88))",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <style>{`
        .obso-nav{
          height: 72px;
          display:flex;
          align-items:center;
          gap: 22px;
        }
        .obso-brand{
          display:flex;
          align-items:baseline;
          gap: 10px;
          text-decoration:none;
        }
        .obso-brandMark{
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #D4AF37;
          box-shadow: 0 0 0 6px rgba(212,175,55,.10);
          flex: 0 0 auto;
        }
        .obso-brandName{
          font-weight: 1000;
          letter-spacing: .18em;
          font-size: 18px;
          color: rgba(255,255,255,.92);
        }
        .obso-navlinks{
          display:flex;
          gap: 16px;
          margin-left: 12px;
          padding: 6px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.05);
        }
        .obso-link{
          position: relative;
          padding: 10px 12px;
          border-radius: 999px;
          text-decoration:none;
          color: rgba(255,255,255,.86);
          font-weight: 800;
          font-size: 14px;
          transition: all .15s ease;
        }
        .obso-link:hover{
          color: rgba(255,255,255,.96);
          background: rgba(255,255,255,.06);
        }
        .obso-linkActive{
          background: rgba(212,175,55,.14);
          border: 1px solid rgba(212,175,55,.26);
          color: rgba(255,255,255,.96);
        }
        .obso-cartBadge{
          margin-left: 8px;
          background: #D4AF37;
          color: #111;
          border-radius: 999px;
          padding: 2px 8px;
          font-size: 12px;
          font-weight: 1000;
        }
        .obso-right{
          margin-left:auto;
          display:flex;
          gap: 10px;
          align-items:center;
        }
        .obso-user{
          font-size: 13px;
          color: rgba(255,255,255,.72);
          font-weight: 800;
          white-space: nowrap;
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

        /* Responsive: mobilde linkleri kırpmadan */
        @media (max-width: 820px){
          .obso-nav{ gap: 12px; }
          .obso-navlinks{ gap: 8px; margin-left: 8px; }
          .obso-link{ padding: 9px 10px; font-size: 13px; }
          .obso-user{ display:none; }
        }
        @media (max-width: 620px){
          .obso-navlinks{ overflow-x: auto; scrollbar-width: none; }
          .obso-navlinks::-webkit-scrollbar{ display:none; }
        }
      `}</style>

      <div className="container obso-nav">
        {/* ✅ Site ismi OBSO */}
        <Link to="/" className="obso-brand">
          <span className="obso-brandMark" aria-hidden="true" />
          <span className="obso-brandName">OBSO</span>
        </Link>

        <nav className="obso-navlinks">
          <Link to="/" className={`obso-link ${location.pathname === "/" ? "obso-linkActive" : ""}`} style={isActive("/")}>
            Anasayfa
          </Link>
          <Link to="/shop" className={`obso-link ${location.pathname === "/shop" ? "obso-linkActive" : ""}`} style={isActive("/shop")}>
            Mağaza
          </Link>
          <Link to="/about" className={`obso-link ${location.pathname === "/about" ? "obso-linkActive" : ""}`} style={isActive("/about")}>
            Hakkımızda
          </Link>
          <Link to="/cart" className={`obso-link ${location.pathname === "/cart" ? "obso-linkActive" : ""}`} style={isActive("/cart")}>
            Sepet
            {totals.items > 0 && <span className="obso-cartBadge">{totals.items}</span>}
          </Link>
        </nav>

        <div className="obso-right">
          {customer ? (
            <>
              <span className="obso-user">👤 Merhaba, {customer.username}</span>
              <button className="btn obso-btnGold" style={{ padding: "8px 14px" }} onClick={logoutCustomer}>
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn obso-btnGold" style={{ padding: "8px 14px" }}>
                Giriş Yap
              </Link>
              <Link to="/register" className="btn-ghost obso-btnGhost" style={{ padding: "8px 14px" }}>
                Hesap Oluştur
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
