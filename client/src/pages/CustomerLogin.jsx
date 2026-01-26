import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || "Login failed");

    // customer ise kaydet
    localStorage.setItem("customerUser", JSON.stringify(data.user));
    navigate("/checkout");
  };

  return (
    <div className="container" style={{ padding: "28px 0", maxWidth: 420 }}>
      <h2 className="h2">Customer Login</h2>
      <p className="p" style={{ marginTop: 8 }}>Sepeti tamamlamak için giriş yap.</p>

      <form onSubmit={submit} style={{ marginTop: 14 }}>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
        <br /><br />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
        <br /><br />
        <button className="btn" type="submit">Giriş Yap</button>
        <Link to="/register" className="btn-ghost" style={{ marginLeft: 10 }}>Hesap Aç</Link>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
