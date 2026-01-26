const express = require("express");
const router = express.Router();
const db = require("../db");

// READ – tüm ürünleri getir
router.get("/", (req, res) => {
  db.all("SELECT * FROM products ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// READ – tek ürün
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// CREATE – ürün ekle ✅ (stock + image + createdAt)
router.post("/", (req, res) => {
  const { name, brand, category, price, stock, image } = req.body;

  const createdAt = new Date().toISOString(); // ✅ otomatik tarih

  db.run(
    `INSERT INTO products (name, brand, category, price, stock, image, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      brand,
      category,
      price,
      stock ?? 0,
      image || null,
      createdAt,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "CREATE OK", id: this.lastID });
    }
  );
});

// UPDATE – ürün güncelle ✅ (stock + image)
router.put("/:id", (req, res) => {
  const { name, brand, category, price, stock, image } = req.body;

  db.run(
    `UPDATE products
     SET name=?, brand=?, category=?, price=?, stock=?, image=?
     WHERE id=?`,
    [
      name,
      brand,
      category,
      price,
      stock ?? 0,
      image || null,
      req.params.id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "UPDATE OK" });
    }
  );
});

// DELETE – ürün sil
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
