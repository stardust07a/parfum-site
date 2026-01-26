import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !username || !email || !phone || !password) {
      return setError("Lütfen tüm alanları doldur.");
    }
    if (password !== password2) {
      return setError("Şifreler aynı değil.");
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        fullName,
        email,
        phone,
      }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || "Kayıt başarısız");

    navigate("/login");
  };

  return (
    <div className="container" style={{ padding: "28px 0", maxWidth: 520 }}>
      <h2 className="h2">Hesap Oluştur</h2>
      <p className="p" style={{ marginTop: 8 }}>
        Üyeliğini oluştur ve alışverişe başla.
      </p>

      <form onSubmit={submit} style={{ marginTop: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input
            placeholder="Ad Soyad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ height: 10 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
  <div
    style={{
      padding: "10px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: 14,
      fontWeight: 900,
      background: "#fafafa",
    }}
  >
    +90
  </div>

  <input
    value={phone}
    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
    inputMode="numeric"
    placeholder="5XXXXXXXXX"
    maxLength={10}
    required
    style={{ flex: 1 }}
  />
</div>
        </div>

        <div style={{ height: 10 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre Tekrar"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div style={{ height: 14 }} />

        <button className="btn" type="submit" style={{ width: "100%" }}>
          Hesap Oluştur
        </button>

        <div style={{ height: 10 }} />
        <p className="p" style={{ fontSize: 13 }}>
          Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
        </p>

        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
}
