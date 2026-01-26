const db = require("./db");

// Tablo oluşturma sorguları
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);
`;

const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL,
  description TEXT,
  imageUrl TEXT,
  createdAt TEXT NOT NULL
);
`;

// Admin kullanıcı ekleme (varsa tekrar eklemez)
const seedAdminUser = `
INSERT OR IGNORE INTO users (username, password)
VALUES ('admin', 'admin123');
`;

db.serialize(() => {
  db.run(createUsersTable, (err) => {
    if (err) return console.error("❌ users tablo hatası:", err.message);
    console.log("✅ users tablo hazır");
  });

  db.run(createProductsTable, (err) => {
    if (err) return console.error("❌ products tablo hatası:", err.message);
    console.log("✅ products tablo hazır");
  });

  db.run(seedAdminUser, (err) => {
    if (err) return console.error("❌ admin seed hatası:", err.message);
    console.log("✅ admin user hazır (admin / admin123)");
  });
});

// işlem bitince db kapat
setTimeout(() => db.close(), 500);
