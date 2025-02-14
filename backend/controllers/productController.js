import sql from "../config/db.js";

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC    
        `;
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const createProduct = async (req, res) => {
    const { name, image, price } = req.body;
    if (!name || !image || !price) {
        return res.status(400).json({
            success: false,
            message: "Name, image, and price are required"
        });
    }
    try {
        const newProduct = await sql`INSERT INTO products (name, image, price) VALUES (${name}, ${image}, ${price})
        RETURNING *
        `;
        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await sql`SELECT * FROM products WHERE id = ${id}`;
        res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, image, price } = req.body;
    if (!name || !image || !price) {
        return res.status(400).json({ success: false, message: "Name, image, and price are required" });
    }
    try {
        const updatedProduct = await sql`UPDATE products SET name = ${name}, image = ${image}, price = ${price} WHERE id = ${id}
        RETURNING *
        `;
        if (updatedProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING *`;
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};