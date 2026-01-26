import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
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

    if (data.user.role !== "admin") {
      return setError("Bu giriş admin için. (role admin değil)");
    }

    localStorage.setItem("adminUser", JSON.stringify(data.user));
    navigate("/admin/products");
  };

  return (
    <div className="container" style={{ padding: "28px 0", maxWidth: 420 }}>
      <h2 className="h2">Admin Login</h2>
      <p className="p" style={{ marginTop: 8 }}>admin / admin123</p>

      <form onSubmit={submit} style={{ marginTop: 14 }}>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
        <br /><br />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
        <br /><br />
        <button className="btn" type="submit">Admin Giriş</button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
