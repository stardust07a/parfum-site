const db = require("./db");

db.serialize(() => {
  db.run(`ALTER TABLE products ADD COLUMN image TEXT`, (err) => {
    if (err) {
      console.log("ℹ️ image kolonu zaten var olabilir:", err.message);
    } else {
      console.log("✅ products tablosuna image kolonu eklendi");
    }
    db.close();
  });
});
