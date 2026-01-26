const express = require("express");
const router = express.Router();
const db = require("../db");

// REGISTER (customer)
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Kullanıcı adı ve şifre zorunlu" });
  }

  db.run(
    "INSERT INTO users (username, password, role) VALUES (?, ?, 'customer')",
    [username, password],
    function (err) {
      if (err) return res.status(400).json({ error: "Bu kullanıcı adı zaten var" });
      return res.json({ message: "Kayıt başarılı ✅", id: this.lastID });
    }
  );
});


// LOGIN (admin veya customer)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Kullanıcı adı ve şifre zorunlu" });
  }

  db.get(
    "SELECT id, username, role FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!user) {
        return res.status(401).json({ error: "Hatalı kullanıcı adı/şifre" });
      }

      return res.json({
        message: "Giriş başarılı ✅",
        user,
      });
    }
  );
});

module.exports = router;
