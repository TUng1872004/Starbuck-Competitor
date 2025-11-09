const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON bodies

const PRODUCTS_FILE = path.join(__dirname, "data", "products.json");

// Helper to read/write products.json
function readProducts() {
    return JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf-8"));
}

function writeProducts(products) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
}

// Serve frontend static files
app.use(express.static(__dirname));

// API endpoint to update product
app.post("/api/update-product", (req, res) => {
    const { id, quantity } = req.body;
    const products = readProducts();
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
    }

    product.stock = Math.max((product.stock || 0) - quantity, 0);
    product.order = (product.order || 0) + quantity;

    writeProducts(products);
    res.json({ success: true });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
