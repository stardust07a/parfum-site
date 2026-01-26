import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Giriş başarısız");

      // ✅ Admin ise panele gönder
      if (data.user.role === "admin") {
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        navigate("/admin/products");
        return;
      }

      // ✅ Müşteri ise mağazaya gönder
      localStorage.setItem("customerUser", JSON.stringify(data.user));
      navigate("/shop");
    } catch (e) {
      setError("Server hatası");
    }
  };

  return (
    <div className="container" style={{ padding: "28px 0", maxWidth: 420 }}>
      <h2 className="h2">Giriş Yap</h2>
      <p className="p" style={{ marginTop: 8 }}>Hesabınla giriş yap.</p>

      <form onSubmit={submit} style={{ marginTop: 14 }}>
        <input
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button className="btn" type="submit">Giriş Yap</button>
        <Link to="/register" className="btn-ghost" style={{ marginLeft: 10 }}>
          Hesap Oluştur
        </Link>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
