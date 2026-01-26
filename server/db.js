const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// database dosyası server klasöründe oluşacak
const dbPath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ DB bağlantı hatası:", err.message);
  } else {
    console.log("✅ SQLite DB bağlı:", dbPath);
  }
});

module.exports = db;
