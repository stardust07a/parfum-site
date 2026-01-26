const express = require("express");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// API routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ✅ test endpoint
app.get("/api/health", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ React build'i yayınla
app.use(express.static(path.join(__dirname, "../client/dist")));

// ✅ Express v5 catch-all (wildcard)
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ✅ listen en altta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
