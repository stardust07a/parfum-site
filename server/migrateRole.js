const db = require("./db");

db.serialize(() => {
  // role kolonu yoksa ekle (SQLite'ta IF NOT EXISTS yok, try/catch ile yapıyoruz)
  db.run(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'customer'`, (err) => {
    if (err) {
      console.log("ℹ️ role kolonu zaten var olabilir:", err.message);
    } else {
      console.log("✅ role kolonu eklendi");
    }

    // admin'i admin role yap
    db.run(
      `UPDATE users SET role = 'admin' WHERE username = 'admin'`,
      (err2) => {
        if (err2) console.log("❌ admin role update hata:", err2.message);
        else console.log("✅ admin role=admin yapıldı");
        db.close();
      }
    );
  });
});